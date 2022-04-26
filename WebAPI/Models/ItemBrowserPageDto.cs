namespace Data.Models;

using Data.Enums;

public class ItemBrowserPageDto
{
    public Guid ItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public DateTime UploadDate { get; set; }
    public string? City { get; set; } = string.Empty;
}
