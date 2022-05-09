namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services.Interfaces;

[Route("api/[controller]")]
[ApiController, Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IItemService _itemService;


    public UserController(IUserService userService, IItemService itemService)
    {
        _userService = userService;
        _itemService = itemService;
    }

    [HttpGet, Authorize]
    public async Task<List<User>> GetUsers()
    {
        return await _userService.GetUsers();
    }

    [HttpGet("{id}"), Authorize]
    public async Task<User?> GetUser(Guid id)
    {
        return await _userService.GetUser(id);
    }

    [HttpGet("UserScreen/{id}")]
    public async Task<UserScreenDto?> GetUserScreenDetails([FromRoute] Guid id)
    {
        var user = await _userService.GetUser(id);

        if (user == null)
        {
            return null;
        }

        return new UserScreenDto
        {
            UserId = user.UserId,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Image = user.Image,
            Address = user.Address,
            ListedItems = await _itemService.GetItemsWithSeveralIdsForBrowserPage(user.UserId),
        };
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        await _userService.CreateUser(user);
        return Ok();
    }
}
