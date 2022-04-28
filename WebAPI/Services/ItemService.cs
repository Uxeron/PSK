namespace WebAPI.Services;

using Data;
using Data.Models;
using Data.Requests;
using Data.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;

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

        // itemEntity.Images = partialItem.Images; // TODO: PSK-50

        return itemEntity;
    }

    public async Task CreateItem(Item item)
    {
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    public async Task<Item?> GetItem(Guid id) => 
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

    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage(ItemsPageQuery filters, PagingQuery paging)
    {
        var itemsForBrowserPage = await GetItems();

        if (itemsForBrowserPage == null)
        {
            return null;
        }

        IEnumerable<ItemBrowserPageDto>? itemDtos = null;

        itemDtos = itemsForBrowserPage
            .Select(i => new ItemBrowserPageDto
            {
                ItemId = i.ItemId,
                Name = i.Name,
                Description = i.Description,
                Image = "TODO", // TODO PSK-50
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

    public async Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(Guid id)
    {
        var item = await GetItem(id);

        if(item == null)
        {
            return null;
        }

        var itemDto = new ItemDetailsScreenDto();

        itemDto =  new ItemDetailsScreenDto
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

    public async Task UpdateItem(ItemRequest itemRequest, Item item)
    {
        var updatedItem = MapDtoToModel(itemRequest);
        _context.Entry(item).State = EntityState.Detached;
        _context.Entry(updatedItem).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    private Item MapDtoToModel(ItemRequest itemRequest)
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
            Images = itemRequest.Images,
        };
    }
}
