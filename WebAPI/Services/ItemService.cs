namespace WebAPI.Services;

using Data;
using Data.Models;
using Data.Requests;
using Data.Wrappers;
using Microsoft.EntityFrameworkCore;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using Autofac.Extras.DynamicProxy;
using WebAPI.Logger;

[Intercept(typeof(LoggerInterceptor))]
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
        var item = await BuildItemEntity(partialItem);

        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();

        return item.ItemId;
    }

    private async Task<Item> BuildItemEntity(PartialItem partialItem) => new()
        {
            Name = partialItem.Name,
            Address = await _addressService.GetAddress(partialItem.UserId, partialItem.AddressId),
            Description = partialItem.Description,
            Condition = partialItem.Condition,
            Category = partialItem.Category,
            IsToGiveAway = partialItem.IsToGiveAway,
            User = await _userService.GetUser(partialItem.UserId),
            UploadDate = DateTime.Now,
            Images = await SaveImages(partialItem.Name, partialItem.Image)
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

        return images;

    }

    private static byte[] ResizeImage(byte[] byteImageIn)
    {
        using var image = SixLabors.ImageSharp.Image.Load(byteImageIn);

        const int height = 400;
        var width = (image.Width * height) / image.Height;
        image.Mutate(x => x.Resize(width, height));

        using var ms = new MemoryStream();
        image.Save(ms, new JpegEncoder());
        return ms.ToArray();
    }

    public async Task<Item?> GetItem(string userId, Guid id) =>
        await _context.Items
            .Where(i => i.ItemId == id)
            .Include(i => i.User)
            .Include(i => i.Address)
            .Include(i => i.Images)
            .FirstOrDefaultAsync();

    public async Task<List<Item>> GetItems() =>
        await _context.Items
            .Include(i => i.User)
            .Include(x => x.Address)
            .Include(x => x.Images)
            .ToListAsync();

    private async Task<List<Guid>> GetUserItemsIds(string userId)
    {
        return await _context.Items.Where(
            x => x.User != null && x.User.UserId == userId
            ).Select(x => x.ItemId).ToListAsync();
    }

    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage(string userId, ItemsPageQuery filters, PagingQuery paging)
    {
        var itemsForBrowserPage = await GetItems();

        if (itemsForBrowserPage == null)
        {
            return null;
        }

        var itemDtos = MapItemsToItemBrowserPage(itemsForBrowserPage);

        itemDtos = Filter(filters, itemDtos);

        int count = itemDtos.Count();

        itemDtos = itemDtos.Skip((paging.Page - 1) * paging.ItemsPerPage).Take(paging.ItemsPerPage);

        var paged = new Paged<ItemBrowserPageDto>(itemDtos, paging.Page, count, paging.ItemsPerPage);
        return paged;
    }

    private static IEnumerable<ItemBrowserPageDto> MapItemsToItemBrowserPage(List<Item> itemsForBrowserPage)
    {
        return itemsForBrowserPage
            .Select(i => new ItemBrowserPageDto
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Description = i.Description,
                Image = i.Images.Any() ? i.Images.First().Prefix + ',' + Convert.ToBase64String(i.Images.First().ThumbnailImageData) : string.Empty,
                Condition = i.Condition,
                Category = i.Category,
                UploadDate = i.UploadDate,
                City = i.Address?.City,
            })
            .ToList();
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

    public async Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(string userId, Guid id)
    {

        var item = await GetItem(userId, id);

        if(item == null)
        {
            return null;
        }

        var itemDto =  new ItemDetailsScreenDto
            {
                ItemId = item.ItemId,
                Name = item.Name,
                Description = item.Description,
                Condition = item.Condition,
                Category = item.Category,
                IsToGiveAway = item.IsToGiveAway,
                IsTakenAway = DateTime.Today < item.From && item.From < DateTime.Today,
                To = item.To,
                UploadDate = item.UploadDate,
                UpdateDate = item.UpdateDate,
                Images = item.Images,
                Country = item.Address?.Country,
                City = item.Address?.City,
                StreetName = item.Address?.StreetName,
        };

        return itemDto;
    }

    public async Task<List<ItemBrowserPageDto>?> GetItemsWithSeveralIdsForBrowserPage(string userId)
    {
        var itemIds = await GetUserItemsIds(userId);
        var items = await _context.Items.Where(x => itemIds.Contains(x.ItemId)).ToListAsync();

        if (!items.Any())
        {
            return null;
        }

        return (List<ItemBrowserPageDto>?)MapItemsToItemBrowserPage(items);
    }

    public async Task UpdateItem(ItemRequest itemRequest, Item item)
    {
        var updatedItem = await MapDtoToModel(itemRequest);
        _context.Entry(item).State = EntityState.Detached;
        _context.Entry(updatedItem).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    private async Task<Item> MapDtoToModel(ItemRequest itemRequest)
    {
        return new Item
        {
            ItemId = itemRequest.ItemId,
            Name = itemRequest.Name,
            Description = itemRequest.Description,
            Condition = itemRequest.Condition,
            Category = itemRequest.Category,
            IsToGiveAway = itemRequest.IsToGiveAway,
            From = itemRequest.From,
            To = itemRequest.To,
            UploadDate = itemRequest.UploadDate,
            UpdateDate = DateTime.Today,
            Images = await SaveImages(itemRequest.Name, itemRequest.Image),
        };
    }
}
