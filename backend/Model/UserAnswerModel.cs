using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Model;

[Index(nameof(UserId), nameof(TempletId), IsUnique = true)]
public class UserAnswerModel
{
    [Key]
    public int Id { get; set; }

    // ✅ Foreign key for User
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public UserModel? User { get; set; }

    // ✅ Foreign key for Templet
    public int TempletId { get; set; }
    [ForeignKey("TempletId")]
    public TempletModel? Templet { get; set; }

    // ✅ Up to 4 Single-Line Text Fields
    public bool String1State { get; set; }
    public string? String1Answer { get; set; }

    public bool String2State { get; set; }
    public string? String2Answer { get; set; }

    public bool String3State { get; set; }
    public string? String3Answer { get; set; }

    public bool String4State { get; set; }
    public string? String4Answer { get; set; }

    // ✅ Up to 4 Multi-Line Text Fields
    public bool Text1State { get; set; }
    public string? Text1Answer { get; set; }

    public bool Text2State { get; set; }
    public string? Text2Answer { get; set; }

    public bool Text3State { get; set; }
    public string? Text3Answer { get; set; }

    public bool Text4State { get; set; }
    public string? Text4Answer { get; set; }

    // ✅ Up to 4 Integer Fields
    public bool Int1State { get; set; }
    public int? Int1Answer { get; set; }

    public bool Int2State { get; set; }
    public int? Int2Answer { get; set; }

    public bool Int3State { get; set; }
    public int? Int3Answer { get; set; }

    public bool Int4State { get; set; }
    public int? Int4Answer { get; set; }

    // ✅ Up to 4 Checkboxes
    public bool Checkbox1State { get; set; }
    public int? Checkbox1Answer { get; set; }

    public bool Checkbox2State { get; set; }
    public int? Checkbox2Answer { get; set; }

    public bool Checkbox3State { get; set; }
    public int? Checkbox3Answer { get; set; }

    public bool Checkbox4State { get; set; }
    public int? Checkbox4Answer { get; set; }
}
