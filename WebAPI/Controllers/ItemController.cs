namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;
using Data.Requests;
using Data.Wrappers;
using Microsoft.AspNetCore.Authorization;

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
    public async Task<Item?> GetItem([FromRoute] Guid id)
    {
        return await _itemService.GetItem(id);
    }

    [HttpPost, Authorize] //Example how to add Authorize
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

    [HttpGet("DetailsPage/{id}")]
    public async Task<ItemDetailsScreenDto?> GetItemForDetailsScreen([FromRoute] Guid id)
    {
        return await _itemService.GetItemForDetailsScreen(id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem([FromRoute] Guid id, [FromBody] ItemRequest itemRequest)
    {
        if (id != itemRequest.ItemId)
        {
            return BadRequest();
        }

        var item = await _itemService.GetItem(id);
        if (item == null)
        {
            return NotFound("Item with this id does not exist");
        }

        await _itemService.UpdateItem(itemRequest, item);
        return Ok();
    }
}
