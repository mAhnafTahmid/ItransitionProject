using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Model;
using backend.Context;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller;

[Route("api/admin")]
[ApiController]
public class AdminController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet("user/info/{searchParam}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UserInfo(string searchParam)
    {
        var user = await FindUserAsync(searchParam);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var result = new
        {
            user.Id,
            user.Name,
            user.Email,
            Templets = user.Templets.ToList()
        };

        return Ok(result);
    }

    private async Task<UserModel?> FindUserAsync(string searchParam)
    {
        if (int.TryParse(searchParam, out int userId))
        {
            return await _context.Users
                .Include(u => u.Templets)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
        else if (searchParam.Contains('@'))
        {
            return await _context.Users
                .Include(u => u.Templets)
                .FirstOrDefaultAsync(u => u.Email == searchParam);
        }
        else
        {
            return await _context.Users
                .Include(u => u.Templets)
                .FirstOrDefaultAsync(u => u.Name == searchParam);
        }
    }

    [HttpGet("dashboard/stats")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DashboardStats()
    {
        var totalUsers = await _context.Users.CountAsync();
        var totalTemplets = await _context.Templets.CountAsync();
        var admins = await _context.Users
            .Where(u => u.Status == "admin")
            .Select(u => new { u.Id, u.Name, u.Email })
            .ToListAsync();

        return Ok(new
        {
            TotalUsers = totalUsers,
            TotalTemplets = totalTemplets,
            Admins = admins
        });
    }

    [HttpDelete("delete/user/{userId}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteUser(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User deleted successfully." });
    }

    [HttpPut("change/{adminId}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DemoteAdmin(int adminId)
    {
        var admin = await _context.Users.FindAsync(adminId);
        if (admin == null)
        {
            return NotFound(new { message = "Admin not found" });
        }

        if (admin.Status != "admin")
        {
            return BadRequest(new { message = "User is not an admin" });
        }

        // Change status to non-admin
        admin.Status = "non-admin";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Admin has been demoted to non-admin" });
    }
}
