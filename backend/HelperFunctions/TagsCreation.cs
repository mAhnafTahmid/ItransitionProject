using backend.Context;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.HelperFunctions;

public class TagsCreation(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task<List<TagsModel>> GetOrCreateTagsAsync(List<string> tagNames)
    {
        var existingTags = await _context.Tags.Where(t => tagNames.Contains(t.Name)).ToListAsync();
        var missingTagNames = tagNames.Except(existingTags.Select(t => t.Name)).ToList();
        var newTags = missingTagNames.Select(name => new TagsModel { Name = name }).ToList();
        if (newTags.Any())
        {
            _context.Tags.AddRange(newTags);
            await _context.SaveChangesAsync();
        }
        return existingTags.Concat(newTags).ToList();
    }
}
