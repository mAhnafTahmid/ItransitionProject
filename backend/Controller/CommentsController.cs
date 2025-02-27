using backend.Context;
using backend.HelperFunctions;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller;

[Route("api/[controller]")]
[ApiController]
public class CommentController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    /// <summary>
    /// Create a new comment for a template.
    /// </summary>
    /// <param name="request">The comment data to be added.</param>
    /// <returns>Created comment with a success message.</returns>
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateComment([FromBody] CommentCreateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var templet = await _context.Templets.FirstOrDefaultAsync(t => t.Id == request.TempletId);
        if (templet == null)
            return NotFound(new { message = "Template not found." });

        var comment = new CommentModel
        {
            Comment = request.Comment,
            TempletId = request.TempletId,
            Likes = 0,
            Templet = templet
        };
        _context.Comments.Add(comment);
        try
        {
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(CreateComment), new { id = comment.Id }, new { message = "Comment added successfully." });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while processing your request." });
        }
    }
}
