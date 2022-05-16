namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;
using SFKR.Request;
using WebAPI.Models;
using WebAPI.Services.Interfaces;
using Data.Requests;
using Data.Wrappers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
    [Authorize]
    public async Task<IActionResult> CreateItem([FromBody] PartialItem item)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }

        item.UserId = userId;
        var itemId = await _itemService.CreateItem(item);
        return Ok(itemId);
    }

    [HttpGet]
    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage([FromQuery] ItemsPageQuery filters, [FromQuery] PagingQuery paging)
    {
        return await _itemService.GetItemsForBrowserPage(filters, paging);
    }

    [HttpGet("DetailsPage/{id}")]
    public async Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(Guid id)
    {
        return await _itemService.GetItemForDetailsScreen(id);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateItem(Guid id, [FromBody] ItemRequest itemRequest)
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

        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (item.User?.UserId != userId)
        {
            return Unauthorized();
        }

        await _itemService.UpdateItem(itemRequest, item);
        return Ok();
    }
}
