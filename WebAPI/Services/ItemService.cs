namespace WebAPI.Services;

using Data;
using Data.Models.Item;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;

public class ItemService : IItemService
{
    private readonly PskContext _context;

    public ItemService(PskContext context)
    {
        _context = context;
    }

    public async Task CreateItem(Item item)
    {
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    public async Task<Item?> GetItem(Guid id)
    {
        return await _context.Items.Where(i => i.ItemId == id).FirstOrDefaultAsync();
    }
}
