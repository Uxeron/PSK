namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;
using Data.Requests;
using Data.Wrappers;

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

    [HttpPost]
    public async Task<IActionResult> CreateItem([FromBody] PartialItem item)
    {
        Guid itemId = await _itemService.CreateItem(item);
        return Ok(itemId);
    }

    [HttpGet]
    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage([FromQuery] ItemsPageQuery filters, [FromQuery] PagingQuery paging)
    {
        return await _itemService.GetItemsForBrowserPage(filters, paging);
    }
}
