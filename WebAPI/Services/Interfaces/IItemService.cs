namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;
using WebAPI.Models;

public interface IItemService
{
    Task<Item?> GetItem(Guid id);
    Task<Guid> CreateItem(PartialItem item);
    //Task<Paged<Item>> GetItemsForBrowserPage();
}
