using System.ComponentModel.DataAnnotations;

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

    public List<TempletModel> Templets { get; set; } = [];

    public List<UserLikedTemplet> LikedTemplets { get; set; } = [];
}


