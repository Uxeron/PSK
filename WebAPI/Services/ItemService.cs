namespace WebAPI.Services;

using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;

public class ItemService : IItemService
{
    private readonly PskContext _context;

    public ItemService(PskContext context)
    {
        _context = context;
    }

    public async Task<Item?> GetItem(Guid id)
    {
        return await _context.Items.Where(i => i.ItemId == id).FirstOrDefaultAsync();
    }
}
