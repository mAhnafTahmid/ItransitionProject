using System.ComponentModel.DataAnnotations;

namespace backend.HelperFunctions;

/// <summary>
/// Request model for user registration.
/// </summary>
public class UserRegisterRequest
{
    [Required]
    public required string Name { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    public required string Password { get; set; }

    public string? Status { get; set; }
}