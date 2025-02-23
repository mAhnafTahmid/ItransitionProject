using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.HelperFunctions;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller;

[Route("api/templets")]
[ApiController]
public class TempletController(AppDbContext context, TagsCreation tagsCreation) : ControllerBase
{
    private readonly AppDbContext _context = context;
    private readonly TagsCreation _tagsCreation = tagsCreation;

    /// <summary>
    /// Creates a new template.
    /// </summary>
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateTemplet([FromBody] TempletCreateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Check if the user exists
        var user = await _context.Users.FindAsync(request.UserId);
        if (user == null)
            return NotFound(new { message = "User not found." });

        var tags = await _tagsCreation.GetOrCreateTagsAsync(request.TagNames); // Injected service

        // Create the template and link the tags
        var templet = TempletHelper.MapToTempletModel(request, user, tags);

        // Ensure tags reference the new template
        foreach (var tag in tags)
        {
            tag.Templets.Add(templet);
        }

        _context.Templets.Add(templet);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateTemplet), new { id = templet.Id }, new { message = "Templet created successfully." });
    }


    /// <summary>
    /// Updates an existing template.
    /// </summary>
    [HttpPut("update/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateTemplet(int id, [FromBody] TempletCreateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Find the existing templet with related tags
        var templet = await _context.Templets
            .Include(t => t.Tags)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (templet == null)
            return NotFound(new { message = "Templet not found." });

        // Ensure the user exists and is the owner of the template
        var user = await _context.Users.FindAsync(request.UserId);
        if (user == null || templet.UserId != user.Id)
            return Unauthorized(new { message = "Unauthorized to update this templet." });

        // Get or create the updated tags
        var updatedTags = await _tagsCreation.GetOrCreateTagsAsync(request.TagNames);

        // Remove old tags that are no longer in the updated list
        templet.Tags.RemoveAll(t => !updatedTags.Contains(t));

        // Add new tags that are missing
        foreach (var tag in updatedTags)
        {
            if (!templet.Tags.Contains(tag))
                templet.Tags.Add(tag);
        }

        // Update the template properties
        TempletHelper.UpdateTempletModel(templet, request, updatedTags);

        _context.Templets.Update(templet);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Templet updated successfully." });
    }


    /// <summary>
    /// Deletes a template by its ID.
    /// </summary>
    [HttpDelete("delete/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteTemplet(int id)
    {
        var templet = await _context.Templets.FindAsync(id);
        if (templet == null)
            return NotFound(new { message = "Templet not found." });

        _context.Templets.Remove(templet);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Templet deleted successfully." });
    }

    [HttpGet("top10")]
    public async Task<IActionResult> GetTop10Templates()
    {
        var topTemplates = await _context.Templets
            .Include(t => t.Tags)  // Include associated Tags
            .OrderByDescending(t => t.Likes)
            .Take(10)
            .ToListAsync();

        // Project the data to include only the tag id and name
        var result = topTemplates.Select(t => new
        {
            t.Id,
            t.Title,
            t.Description,
            t.Likes,
            t.Topic,
            Tags = t.Tags.Select(tag => new
            {
                tag.Id,
                tag.Name
            }).ToList()
        }).ToList();

        return Ok(result);
    }


    [HttpGet("templet/{id}")]
    public async Task<IActionResult> GetTempletById(int id)
    {
        var templet = await _context.Templets
            .Include(t => t.Tags)       // Include associated Tags
            .Include(t => t.Comments)   // Include Comments
            .Include(t => t.Answers)    // Include User Answers
            .FirstOrDefaultAsync(t => t.Id == id);

        if (templet == null)
            return NotFound(new { message = "Templet not found." });

        return Ok(templet);
    }

    [HttpGet("search")]
    [Authorize]
    public async Task<IActionResult> SearchTemplets([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { message = "Search query cannot be empty." });
        }

        var searchQuery = query.ToLower(); // Make sure the query is in lowercase for case-insensitivity.

        var results = await _context.Templets
            .FromSqlRaw("SELECT * FROM \"Templets\" WHERE \"SearchVector\" @@ plainto_tsquery('english', {0})", searchQuery)
            .Take(10)
            .ToListAsync();

        return Ok(results);
    }
}




