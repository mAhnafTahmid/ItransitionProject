using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

namespace backend.Model;

public class TempletModel
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Description { get; set; }  // Supports Markdown formatting

    public string? ImageUrl { get; set; }  // Optional illustration (Cloud storage URL)

    [Required]
    public int Likes { get; set; } = 0;
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public required UserModel User { get; set; }

    public List<CommentModel> Comments { get; set; } = [];
    public List<UserAnswerModel> Answers { get; set; } = [];

    [Required]
    public required string Topic { get; set; } // Separate table for predefined topics

    public bool IsPublic { get; set; } = true;  // Public or restricted template

    public List<string> AccessList { get; set; } = [];  // List of users with access

    public List<TagsModel> Tags { get; set; } = [];

    [NotMapped] // ✅ Ignore in EF Core migrations
    public NpgsqlTsVector? SearchVector { get; set; }

    // ✅ Up to 4 Single-Line Text Fields
    public bool String1State { get; set; }
    public string? String1Question { get; set; }

    public bool String2State { get; set; }
    public string? String2Question { get; set; }

    public bool String3State { get; set; }
    public string? String3Question { get; set; }

    public bool String4State { get; set; }
    public string? String4Question { get; set; }

    // ✅ Up to 4 Multi-Line Text Fields
    public bool Text1State { get; set; }
    public string? Text1Question { get; set; }

    public bool Text2State { get; set; }
    public string? Text2Question { get; set; }

    public bool Text3State { get; set; }
    public string? Text3Question { get; set; }

    public bool Text4State { get; set; }
    public string? Text4Question { get; set; }

    // ✅ Up to 4 Integer Fields
    public bool Int1State { get; set; }
    public string? Int1Question { get; set; }

    public bool Int2State { get; set; }
    public string? Int2Question { get; set; }

    public bool Int3State { get; set; }
    public string? Int3Question { get; set; }

    public bool Int4State { get; set; }
    public string? Int4Question { get; set; }

    // ✅ Up to 4 Checkboxes
    public bool Checkbox1State { get; set; }
    public string? Checkbox1Question { get; set; }
    public string? Checkbox1Option1 { get; set; }
    public string? Checkbox1Option2 { get; set; }
    public string? Checkbox1Option3 { get; set; }
    public string? Checkbox1Option4 { get; set; }


    public bool Checkbox2State { get; set; }
    public string? Checkbox2Question { get; set; }
    public string? Checkbox2Option1 { get; set; }
    public string? Checkbox2Option2 { get; set; }
    public string? Checkbox2Option3 { get; set; }
    public string? Checkbox2Option4 { get; set; }

    public bool Checkbox3State { get; set; }
    public string? Checkbox3Question { get; set; }
    public string? Checkbox3Option1 { get; set; }
    public string? Checkbox3Option2 { get; set; }
    public string? Checkbox3Option3 { get; set; }
    public string? Checkbox3Option4 { get; set; }

    public bool Checkbox4State { get; set; }
    public string? Checkbox4Question { get; set; }
    public string? Checkbox4Option1 { get; set; }
    public string? Checkbox4Option2 { get; set; }
    public string? Checkbox4Option3 { get; set; }
    public string? Checkbox4Option4 { get; set; }
}
