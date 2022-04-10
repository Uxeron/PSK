namespace WebAPI.Services;

using System;
using System.Threading.Tasks;
using Data.Models.Item;

public interface IItemService
{
    Task<Item?> GetItem(Guid id);
}
