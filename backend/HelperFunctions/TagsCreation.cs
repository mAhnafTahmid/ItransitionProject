using backend.Context;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.HelperFunctions;

public class TagsCreation(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task<List<TagsModel>> GetOrCreateTagsAsync(List<string> tagNames)
    {
        // Fetch existing tags
        var existingTags = await _context.Tags.Where(t => tagNames.Contains(t.Name)).ToListAsync();

        // Find missing tag names
        var missingTagNames = tagNames.Except(existingTags.Select(t => t.Name)).ToList();

        // Create missing tags
        var newTags = missingTagNames.Select(name => new TagsModel { Name = name }).ToList();

        if (newTags.Any())
        {
            _context.Tags.AddRange(newTags);
            await _context.SaveChangesAsync();
        }

        // Return the combined list of existing and new tags
        return existingTags.Concat(newTags).ToList();
    }
}
