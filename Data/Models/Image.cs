namespace Data.Models;

public class Image
{
    public Guid ImageId { get; set; }
    public byte[] ImageData { get; set; } = new byte[0];
    public byte[] ThumbnailImageData { get; set; } = new byte[0];
    public string Name { get; set; } = string.Empty;

    public string Prefix { get; set; } = string.Empty;

    public Item Item { get; set; } = new Item();
}
