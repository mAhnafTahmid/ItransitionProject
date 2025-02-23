using System.ComponentModel.DataAnnotations;

namespace backend.HelperFunctions;

/// <summary>
/// Request model for creating a comment.
/// </summary>
public class CommentCreateRequest
{
    [Required]
    public required string Comment { get; set; }

    [Required]
    public int TempletId { get; set; }  // The template that the comment belongs to
}