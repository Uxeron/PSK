namespace Data.Models;

public class Address
{
    public Guid AddressId { get; set; }
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string StreetName { get; set; } = string.Empty;
}
