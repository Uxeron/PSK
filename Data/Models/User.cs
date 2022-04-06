namespace Data.Models;

public class User
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public Address? Address { get; set; }
}
