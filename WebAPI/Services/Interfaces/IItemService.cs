namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;
using Data.Requests;
using Data.Wrappers;
using SFKR.Request;
using WebAPI.Models;

public interface IItemService
{
    Task<Item?> GetItem(string userId, Guid id);
    Task<List<Item>> GetItems();
    Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(string userId, Guid id);
    Task<Guid> CreateItem(PartialItem item);
    Task UpdateItem(ItemRequest itemRequest, Item item);
    Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage(string userId, ItemsPageQuery filters, PagingQuery paging);
    Task<List<ItemBrowserPageDto>?> GetItemsWithSeveralIdsForBrowserPage(string userId);
}
