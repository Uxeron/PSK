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
    Task<Item?> GetItem(Guid id);
    Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(Guid id);
    Task<Guid> CreateItem(PartialItem item);
    Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage(ItemsPageQuery filters, PagingQuery paging);
}
