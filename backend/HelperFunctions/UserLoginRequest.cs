using System.ComponentModel.DataAnnotations;

namespace backend.HelperFunctions;

/// <summary>
/// Request model for user login.
/// </summary>
public class UserLoginRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}