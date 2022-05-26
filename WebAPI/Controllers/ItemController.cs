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
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        return await _itemService.GetItem(userId, id);
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
    public async Task<Paged<ItemBrowserPageDto>?> GetItemsForBrowserPage([FromQuery] ItemsPageQuery filters, [FromQuery] PagingQuery paging, [FromQuery] string? searchPhrase = null)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        return await _itemService.GetItemsForBrowserPage(userId, filters, paging, searchPhrase);
    }

    [HttpGet("DetailsPage/{id}")]
    public async Task<ItemDetailsScreenDto?> GetItemForDetailsScreen(Guid id)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        return await _itemService.GetItemForDetailsScreen(userId, id);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateItem(Guid id, [FromBody] ItemRequest itemRequest)
    {
        if (id != itemRequest.ItemId)
        {
            return BadRequest();
        }

        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        
        var item = await _itemService.GetItem(userId, id);
        if (item == null)
        {
            return NotFound("Item with this id does not exist");
        }

        if (item.User?.UserId != userId)
        {
            return Unauthorized();
        }

        if (!(await _itemService.UpdateItemWithoutConflict(itemRequest, item)))
        {
            return Conflict();
        }
        return Ok();
    }
}
