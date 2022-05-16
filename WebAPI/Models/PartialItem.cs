namespace WebAPI.Models;

using Data.Enums;

public class PartialItem
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsToGiveAway { get; set; }
    public string UserId { get; set; } = string.Empty;
    public Guid AddressId { get; set; }
    public string? Tags { get; set; } // TODO PSK-58
    public string Image { get; set; } = string.Empty;
}
