namespace WebAPI.Services;

using Data;
using Data.Models.Item;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;

public class ItemService : IItemService
{
    private readonly PskContext _context;

    public ItemService(PskContext context)
    {
        _context = context;
    }

    public async Task CreateItem(Item item)
    {
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    private async void saveImages(String imageName, String imageData) //Image name - uploaded item name
    {
        string[] imagesData = splitBase64String(imageData);

        foreach (var data in imagesData)
        {
            Image imageEntity = new Image();
            byte[] imageBytes = convertBase64ToBytes(data);

            imageEntity.Name = imageName;
            imageEntity.ImageData = imageBytes;

            await _context.Images.AddAsync(imageEntity);
            await _context.SaveChangesAsync();
        }

    }

    private string[] splitBase64String(String imageData)
    {
        return String.Join("", imageData.Split(','))
            .Split(new string[] { "data:image/jpeg;base64", "data:image/png;base64" }, StringSplitOptions.RemoveEmptyEntries);
    }

    private byte[] convertBase64ToBytes(String encodedImage)
    {
        return Convert.FromBase64String(encodedImage);
    }

    private String convertBytesToBase64(byte[] imageBytes)
    {
        return Convert.ToBase64String(imageBytes);
    }

    public async Task<Item?> GetItem(Guid id)
    {
        return await _context.Items.Where(i => i.ItemId == id).FirstOrDefaultAsync();
    }
}
