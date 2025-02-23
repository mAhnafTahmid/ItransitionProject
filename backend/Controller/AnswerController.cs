using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Model;
using backend.Context;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller;

[Route("api/answers")]
[ApiController]
public class AnswerController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateUserAnswer([FromBody] UserAnswerModel userAnswer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Ensure related entities exist
        var userExists = await _context.Users.AnyAsync(u => u.Id == userAnswer.UserId);
        var templateExists = await _context.Templets.AnyAsync(t => t.Id == userAnswer.TempletId);

        if (!userExists)
        {
            return NotFound(new { message = "User not found." });
        }

        if (!templateExists)
        {
            return NotFound(new { message = "Template not found." });
        }

        try
        {
            _context.UserAnswers.Add(userAnswer);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            // Catch constraint violation exception if duplicate pair exists
            return Conflict(new { message = "An answer for this user and template already exists." });
        }

        return CreatedAtAction(nameof(GetUserAnswer), new { id = userAnswer.Id }, userAnswer);
    }


    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<UserAnswerModel>> GetUserAnswer(int id)
    {
        var answer = await _context.UserAnswers.FindAsync(id);

        if (answer == null)
        {
            return NotFound(new { message = "Answer not found." });
        }

        return Ok(answer);
    }

    [HttpGet("templet/{templetId}")]
    [Authorize]
    public async Task<IActionResult> GetAnswersByTemplet(int templetId)
    {
        var templet = await _context.Templets
            .Where(t => t.Id == templetId)
            .Include(t => t.Answers) // ✅ Load related answers
            .Select(t => new
            {
                TempletId = t.Id,
                Answers = t.Answers.Select(a => new { a.Id, a.UserId }).ToList()
            })
            .FirstOrDefaultAsync();

        if (templet == null)
        {
            return NotFound(new { message = "Templet not found or has no answers." });
        }

        return Ok(templet.Answers);
    }
}