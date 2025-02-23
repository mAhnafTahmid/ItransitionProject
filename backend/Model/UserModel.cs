using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model;

public class UserModel
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }

    [Required]
    public required string Status { get; set; } = "non-admin";

    // ✅ One-to-Many (User → Templets)
    public List<TempletModel> Templets { get; set; } = [];

    // ✅ Many-to-Many (User ↔ Liked Templets)
    public List<UserLikedTemplet> LikedTemplets { get; set; } = [];
}


