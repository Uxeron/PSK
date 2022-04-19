namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models.Item;

public interface IItemService
{
    Task<Item?> GetItem(Guid id);
    Task<Guid> CreateItem(PartialItem item);
}
