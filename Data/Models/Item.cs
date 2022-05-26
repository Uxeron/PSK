namespace Data.Models;

using System.ComponentModel.DataAnnotations;
using Data.Enums;

public class Item
{
    public Guid ItemId { get; set; }
    [ConcurrencyCheck]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsToGiveAway { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime? UpdateDate { get; set; }
    public User? User { get; set; }
    public Address? Address { get; set; }

    public ICollection<Image> Images { get; set; } = new List<Image>();
}
