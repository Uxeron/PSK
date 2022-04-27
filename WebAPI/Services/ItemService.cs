namespace WebAPI.Services;

using Data;
using Data.Models;
using Data.Requests;
using Data.Wrappers;
using Microsoft.EntityFrameworkCore;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;
using System.Drawing;

public class ItemService : IItemService
{
    private readonly PskContext _context;
    private readonly IUserService _userService;
    private readonly IAddressService _addressService;

    public ItemService(PskContext context, IUserService userService, IAddressService addressService)
    {
        _context = context;
        _userService = userService;
        _addressService = addressService;
    }

    public async Task<Guid> CreateItem(PartialItem partialItem)
    {
        Item item = BuildItemEntity(partialItem);

        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();

        return item.ItemId;
    }

    private Item BuildItemEntity(PartialItem partialItem)    
    {
        Item itemEntity = new Item();

        itemEntity.Name = partialItem.Name;
        itemEntity.Address = _addressService.GetAddress(partialItem.AddressId).Result;
        itemEntity.Description = partialItem.Description;
        itemEntity.Condition = partialItem.Condition;
        itemEntity.Category = partialItem.Category;
        itemEntity.IsToGiveAway = partialItem.IsToGiveAway;
        itemEntity.User = _userService.GetUser(partialItem.AddressId).Result;
        itemEntity.UploadDate = DateTime.Now;
        itemEntity.Images = SaveImages(partialItem.Name, partialItem.Image).Result;

        return itemEntity;
    }

    private async Task<List<Data.Models.Image>> SaveImages(String imageName, String imageData) //Image name - uploaded item name
    {
        string[] imagesData = SplitBase64String(imageData);
        List<Data.Models.Image> images = new List<Data.Models.Image>();

        for (int i = 0; i < imagesData.Length; i++)
        {
            Data.Models.Image imageEntity = new Data.Models.Image();
            if (imagesData[i].StartsWith("data:image/"))
            {
                byte[] imageBytes = ConvertBase64ToBytes(imagesData[i + 1]);
                byte[] resizedImage = ResizeImage(imageBytes);

                imageEntity.Name = imageName;
                imageEntity.Prefix = imagesData[i];
                imageEntity.ImageData = imageBytes; 
                imageEntity.ThumbnailImageData = resizedImage;

                await _context.Images.AddAsync(imageEntity);
               
                images.Add(imageEntity);
                i++;
            }
        }

        await _context.SaveChangesAsync();
        return images;

    }

    private byte[] ResizeImage(byte[] byteImageIn)
    {
        Bitmap startBitmap;
        using (var ms = new MemoryStream(byteImageIn))
        {
            startBitmap = new Bitmap(ms);
        }

        Bitmap newBitmap = new Bitmap((startBitmap.Width * 400) / startBitmap.Height, 400);
        using (Graphics graphics = Graphics.FromImage(newBitmap))
        {
            graphics.DrawImage(startBitmap, new Rectangle(0, 0, (startBitmap.Width * 400) / startBitmap.Height, 400), new Rectangle(0, 0, startBitmap.Width, startBitmap.Height), GraphicsUnit.Pixel);
        }

        ImageConverter converter = new ImageConverter();
        return (byte[])converter.ConvertTo(newBitmap, typeof(byte[]));
    }

    private string[] SplitBase64String(String imageData)
    {
        return imageData.Split(',');
    }

    private byte[] ConvertBase64ToBytes(String encodedImage)
    {
        return Convert.FromBase64String(encodedImage);
    }

    private String ConvertBytesToBase64(byte[] imageBytes)
    {
        return Convert.ToBase64String(imageBytes);
    }

    public async Task<Item?> GetItem(Guid id)
    {
        return await _context.Items.Where(i => i.ItemId == id).FirstOrDefaultAsync();
    }

    public async Task<List<Item>> GetItems()
    {
        return await _context.Items.Include(x => x.Address).ToListAsync();
    }

    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage(ItemsPageQuery filters, PagingQuery paging)
    {
        var itemsForBrowserPage = await GetItems();

        IEnumerable<ItemBrowserPageDto>? itemDtos = null;

        if (itemsForBrowserPage == null)
        {
            return null;
        }

        itemDtos = itemsForBrowserPage
            .Select(i => new ItemBrowserPageDto
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Description = i.Description,
                Image = ConvertBytesToBase64(i.Images.First().ThumbnailImageData),
                Condition = i.Condition,
                Category = i.Category,
                UploadDate = i.UploadDate,
                City = i.Address?.City,
            });

        int count = itemDtos.Count();

        itemDtos = Filter(filters, itemDtos);
        itemDtos = itemDtos.Skip((paging.Page - 1) * paging.ItemsPerPage).Take(paging.ItemsPerPage);

        var paged = new Paged<ItemBrowserPageDto>(itemDtos, paging.Page, count, paging.ItemsPerPage);
        return paged;
    }

    private IEnumerable<ItemBrowserPageDto> Filter(ItemsPageQuery filters, IEnumerable<ItemBrowserPageDto> itemDtos)
    {
        if (!String.IsNullOrEmpty(filters.City))
        {
            filters.City = filters.City.ToLower();
            itemDtos = itemDtos.Where(dto => !String.IsNullOrEmpty(dto.City) && dto.City.ToLower().Contains(filters.City));
        }
        if (!String.IsNullOrEmpty(filters.Category))
        {
            filters.Category = filters.Category.ToLower();
            itemDtos = itemDtos.Where(dto => dto.Category.ToString().ToLower().Contains(filters.Category));
        }

        return itemDtos;
    }
}
