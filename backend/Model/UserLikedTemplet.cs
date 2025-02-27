using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class UserLikedTemplet
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }
    public UserModel? User { get; set; }

    [Required]
    public int TempletId { get; set; }
    public TempletModel? Templet { get; set; }

}