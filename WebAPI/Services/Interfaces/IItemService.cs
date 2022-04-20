namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models.Item;

public interface IItemService
{
    Task CreateItem(Item item);
    Task<Item?> GetItem(Guid id);
}
