namespace Data.Models;

using Data.Enums;

public class ItemDetailsScreenDto
{
    public Guid ItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsToGiveAway { get; set; }
    public bool IsTakenAway { get; set; }
    public DateTime? To { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime? UpdateDate { get; set; }
    public ICollection<Image> Images { get; set; } = new List<Image>();
    public string? Country { get; set; } = string.Empty;
    public string? City { get; set; } = string.Empty;
    public string? StreetName { get; set; } = string.Empty;
}
