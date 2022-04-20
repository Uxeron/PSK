namespace Data.Models.Item;

public class PartialItem
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsToGiveAway { get; set; }
    public Guid UserId { get; set; }
    public Guid AddressId { get; set; }
    public String? Tags { get; set; } // TODO PSK-58
    public String? Image { get; set; } // TODO PSK-50
}
