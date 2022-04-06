namespace WebAPI.Controllers;

using Data.Models.Item;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;

[Route("api/[controller]")]
[ApiController]
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet("{id}")]
    public async Task<Item?> GetItem(Guid id)
    {
        return await _itemService.GetItem(id);
    }
}
