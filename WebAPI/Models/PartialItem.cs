namespace Data.Models.Item;

public class PartialItem
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsLoanable { get; set; } //TODO if someone will have a better idea how to rename it - do it :)
    public Guid UserId { get; set; }
    public Guid AddressId { get; set; }
    public String? Tags { get; set; } // TODO PSK-58
    public String? Image { get; set; } // TODO PSK-50
}
