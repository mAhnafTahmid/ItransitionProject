using System.ComponentModel.DataAnnotations;

namespace backend.HelperFunctions;

/// <summary>
/// Request model for creating a template.
/// </summary>
public class TempletCreateRequest
{
    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Description { get; set; }

    public string? ImageUrl { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public required string Topic { get; set; }

    public bool IsPublic { get; set; } = true;

    public List<string>? AccessList { get; set; }
    public List<string> TagNames { get; set; } = [];

    public bool String1State { get; set; }
    public string? String1Question { get; set; }

    public bool String2State { get; set; }
    public string? String2Question { get; set; }

    public bool String3State { get; set; }
    public string? String3Question { get; set; }

    public bool String4State { get; set; }
    public string? String4Question { get; set; }

    public bool Text1State { get; set; }
    public string? Text1Question { get; set; }

    public bool Text2State { get; set; }
    public string? Text2Question { get; set; }

    public bool Text3State { get; set; }
    public string? Text3Question { get; set; }

    public bool Text4State { get; set; }
    public string? Text4Question { get; set; }

    public bool Int1State { get; set; }
    public string? Int1Question { get; set; }

    public bool Int2State { get; set; }
    public string? Int2Question { get; set; }

    public bool Int3State { get; set; }
    public string? Int3Question { get; set; }

    public bool Int4State { get; set; }
    public string? Int4Question { get; set; }

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