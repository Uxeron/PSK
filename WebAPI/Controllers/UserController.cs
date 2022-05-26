namespace WebAPI.Controllers;

using System.Security.Claims;
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

<<<<<<< HEAD
    [HttpGet, Authorize]
    public async Task<List<User>> GetUsers()
=======
    [HttpGet]
    [Authorize]
    public async Task<User?> GetUser()
>>>>>>> c0d2608b0d73d271947903e2b3044d46624f1412
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return null;
        }

        return await _userService.GetUser(userId);
    }

<<<<<<< HEAD
    [HttpGet("{id}"), Authorize]
    public async Task<User?> GetUser(Guid id)
=======
    [HttpGet("UserScreen/{id}")]
    public async Task<UserScreenDto?> GetUserScreenDetails([FromRoute] Guid id)
>>>>>>> c0d2608b0d73d271947903e2b3044d46624f1412
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

    [HttpPost, Authorize]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }

        user.UserId = userId;
        await _userService.CreateUser(user);
        return Ok();
    }
}
