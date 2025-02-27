using Microsoft.AspNetCore.Mvc;
using backend.Context;
using backend.Model;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.HelperFunctions;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller;

[Route("api/tags")]
[ApiController]
public class TagController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    /// <summary>
    /// Auto-complete search for tags based on a query.
    /// </summary>
    /// <param name="query">Partial tag name to search for.</param>
    /// <param name="limit">Maximum number of results to return (default: 10).</param>
    /// <returns>List of matching tags.</returns>
    [HttpGet("autocomplete")]
    [Authorize]
    public async Task<IActionResult> AutoCompleteTags([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return BadRequest(new { message = "Query cannot be empty." });

        var matchingTags = await _context.Tags
            .Where(t => EF.Functions.ILike(t.Name, $"%{query}%"))
            .Select(t => t.Name)
            .ToListAsync();

        var sortedTags = matchingTags
            .OrderByDescending(name => name.StartsWith(query, StringComparison.OrdinalIgnoreCase))
            .ThenByDescending(name => name.Count(c => query.Contains(c)))
            .ThenBy(name => name)
            .Take(5)
            .ToList();

        return Ok(sortedTags);
    }

}

[Route("api/users")]
[ApiController]
public class UserController(AppDbContext context, IConfiguration configuration) : ControllerBase
{
    private readonly AppDbContext _context = context;
    private readonly IConfiguration _configuration = configuration;

    /// <summary>
    /// Registers a new user.
    /// </summary>
    /// <param name="request">User registration details.</param>
    /// <returns>Success message or error.</returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        string hashedPassword = UserPasswordHelper.HashPassword(request.Password);
        var newUser = new UserModel
        {
            Name = request.Name,
            Email = request.Email,
            Password = hashedPassword,
            Status = request.Status ?? "non-admin"
        };
        _context.Users.Add(newUser);
        try
        {
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Register), new { id = newUser.Id }, new { message = "User registered successfully." });
        }
        catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("unique constraint") == true)
        {
            return Conflict(new { message = "Email is already in use." });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while processing your request." });
        }
    }

    /// <summary>
    /// Authenticates a user and returns a JWT token.
    /// </summary>
    /// <param name="request">User login details.</param>
    /// <returns>JWT token if successful, or an error message.</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _context.Users
            .Include(u => u.Templets)
            .Include(u => u.LikedTemplets)
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !UserPasswordHelper.VerifyPassword(request.Password, user.Password))
            return Unauthorized(new { message = "Invalid email or password." });

        string token = GenerateJwtToken(user);
        return Ok(new
        {
            token,
            user = new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                status = user.Status,
                templets = user.Templets.Select(t => new
                {
                    id = t.Id,
                    title = t.Title,
                    description = t.Description,
                    likes = t.Likes
                }),
                likedTemplets = user.LikedTemplets.Select(l => new
                {
                    id = l.TempletId,
                    userId = l.UserId
                })
            }
        });
    }


    /// <summary>
    /// Generates a JWT token valid for 15 minutes.
    /// </summary>
    private string GenerateJwtToken(UserModel user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SecretKey")!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Status),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    [HttpPost("like/templet")]
    [Authorize]
    public async Task<IActionResult> ToggleLikeTemplet([FromBody] LikedTemplet request)
    {
        var user = await _context.Users.FindAsync(request.UserId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }
        var templet = await _context.Templets.FindAsync(request.TempletId);
        if (templet == null)
        {
            return NotFound(new { message = "Templet not found." });
        }
        var existingLike = await _context.UserLikedTemplets
            .FirstOrDefaultAsync(like => like.UserId == request.UserId && like.TempletId == request.TempletId);

        if (existingLike != null)
        {
            _context.UserLikedTemplets.Remove(existingLike);
            templet.Likes = Math.Max(0, templet.Likes - 1);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Like removed.", likes = templet.Likes });
        }
        else
        {
            var likeEntry = new UserLikedTemplet
            {
                UserId = request.UserId,
                TempletId = request.TempletId
            };
            _context.UserLikedTemplets.Add(likeEntry);
            templet.Likes += 1;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Templet liked successfully!", likes = templet.Likes });
        }
    }

    [HttpGet("templet/{userId}")]
    [Authorize]
    public async Task<IActionResult> GetUserTemplets(int userId)
    {
        var templates = await _context.Users
            .Where(t => t.Id == userId)
            .SelectMany(t => t.Templets)
            .Select(temp => new
            {
                temp.Id,
                temp.Title,
                temp.Likes,
                temp.Description,
                Comments = temp.Comments.Select(c => new
                {
                    c.Id,
                    c.Comment,
                    c.Likes
                }).ToList()
            })
            .ToListAsync();

        if (templates == null || templates.Count == 0)
            return NotFound(new { message = "You do not own any template." });

        return Ok(templates);
    }
}

