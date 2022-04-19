namespace Data.Models.Item;

public class Item
{
    public Guid ItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsGivenAway { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public User? User { get; set; }
    public Address? Address { get; set; }

    public ICollection<Image> Images { get; set; } = new List<Image>();


}
