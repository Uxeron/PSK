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
        var item = BuildItemEntity(partialItem);

        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();

        return item.ItemId;
    }

    private Item BuildItemEntity(PartialItem partialItem) => new()
        {
            Name = partialItem.Name,
            Address = _addressService.GetAddress(partialItem.AddressId).Result,
            Description = partialItem.Description,
            Condition = partialItem.Condition,
            Category = partialItem.Category,
            IsToGiveAway = partialItem.IsToGiveAway,
            User = _userService.GetUser(partialItem.AddressId).Result,
            UploadDate = DateTime.Now,
            Images = SaveImages(partialItem.Name, partialItem.Image).Result
        };

    private async Task<List<Data.Models.Image>> SaveImages(string imageName, string imageData) //Image name - uploaded item name
    {
        var imagesData = imageData.Split(',');
        var images = new List<Data.Models.Image>();
        var prefixes = imagesData.Where(i => i.StartsWith("data:image/"));
        var imagesDataBase64 = imagesData.Except(prefixes);

        foreach ((string prefix, string imageDataBase64) in prefixes.Zip(imagesDataBase64))
        {
            var imageBytes = Convert.FromBase64String(imageDataBase64);
            var resizedImage = ResizeImage(imageBytes);

            var imageEntity = new Data.Models.Image()
            {
                Name = imageName,
                Prefix = prefix,
                ImageData = imageBytes,
                ThumbnailImageData = resizedImage,
            };

            await _context.Images.AddAsync(imageEntity);
            images.Add(imageEntity);
        }

        await _context.SaveChangesAsync();
        return images;

    }

    private static byte[] ResizeImage(byte[] byteImageIn)
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

        if (itemsForBrowserPage == null)
        {
            return null;
        }

        var itemDtos = itemsForBrowserPage
            .Select(i => new ItemBrowserPageDto
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Description = i.Description,
                Image = Convert.ToBase64String(i.Images.First().ThumbnailImageData),
                Condition = i.Condition,
                Category = i.Category,
                UploadDate = i.UploadDate,
                City = i.Address?.City,
            });

        itemDtos = Filter(filters, itemDtos);

        int count = itemDtos.Count();

        itemDtos = itemDtos.Skip((paging.Page - 1) * paging.ItemsPerPage).Take(paging.ItemsPerPage);

        var paged = new Paged<ItemBrowserPageDto>(itemDtos, paging.Page, count, paging.ItemsPerPage);
        return paged;
    }

    private static IEnumerable<ItemBrowserPageDto> Filter(ItemsPageQuery filters, IEnumerable<ItemBrowserPageDto> itemDtos)
    {
        if (!string.IsNullOrEmpty(filters.City))
        {
            filters.City = filters.City.ToLower();
            itemDtos = itemDtos.Where(dto => !string.IsNullOrEmpty(dto.City) && dto.City.ToLower().Contains(filters.City));
        }

        if (!string.IsNullOrEmpty(filters.Category))
        {
            filters.Category = filters.Category.ToLower();
            itemDtos = itemDtos.Where(dto => dto.Category.ToString().ToLower().Contains(filters.Category));
        }

        return itemDtos;
    }
}
