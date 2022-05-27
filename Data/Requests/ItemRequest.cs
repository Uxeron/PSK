namespace Data.Requests;

using Data.Enums;
using Data.Models;

public class ItemRequest
{
    public Guid ItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsToGiveAway { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public DateTime UploadDate { get; set; }
    public string UserId { get; set; } = string.Empty;
    public Guid AddressId { get; set; }
    public string Image { get; set; } = string.Empty;
    public bool IsGivenAway { get; set; }
}
