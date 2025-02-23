using System.Security.Cryptography;
using System.Text;

namespace backend.HelperFunctions;

public static class UserPasswordHelper
{
    /// <summary>
    /// Verifies a password against the stored hashed password.
    /// </summary>
    public static bool VerifyPassword(string inputPassword, string storedHashedPassword)
    {
        string hashedInput = HashPassword(inputPassword);
        return hashedInput == storedHashedPassword;
    }

    /// <summary>
    /// Hashes a password using SHA256.
    /// </summary>
    public static string HashPassword(string password)
    {
        byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }


}