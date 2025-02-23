using System.ComponentModel.DataAnnotations;

namespace backend.Model;

// ✅ Join Table for Many-to-Many Relationship
public class UserLikedTemplet
{
    [Key]
    public int Id { get; set; } // Primary key (optional, but useful for EF Core)

    [Required]
    public int UserId { get; set; }
    public UserModel? User { get; set; }

    [Required]
    public int TempletId { get; set; }
    public TempletModel? Templet { get; set; }

}