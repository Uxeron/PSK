namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services.Interfaces;

[Route("api/[controller]")]
[ApiController, Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
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

    [HttpPost, Authorize]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        await _userService.CreateUser(user);
        return Ok();
    }
}
