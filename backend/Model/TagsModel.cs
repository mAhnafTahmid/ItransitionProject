using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class TagsModel
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public required string Name { get; set; }

    public List<TempletModel> Templets { get; set; } = [];
}
