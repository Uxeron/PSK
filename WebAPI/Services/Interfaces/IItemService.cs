namespace WebAPI.Services;

using System;
using System.Threading.Tasks;
using Data.Models;
using Data.Wrappers;

public interface IItemService
{
    Task<Item?> GetItem(Guid id);
    //Task<Paged<Item>> GetItemsForBrowserPage();
}
