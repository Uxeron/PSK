﻿namespace Data.Models.Item;

public class Item
{
    public Guid ItemId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public ItemCondition Condition { get; set; }
    public ItemCategory Category { get; set; }
    public bool IsLoanable { get; set; } //TODO if someone will have a better idea how to rename it - do it :)
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime? UpdateDate { get; set; }
    public User? User { get; set; }
    public Address? Address { get; set; }
}
