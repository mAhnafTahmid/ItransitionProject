using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model;

public class CommentModel
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Comment { get; set; }

    // ✅ Foreign key for Templet
    public int TempletId { get; set; }
    [ForeignKey("TempletId")]
    public required TempletModel Templet { get; set; }

    public int Likes { get; set; } = 0;
}
