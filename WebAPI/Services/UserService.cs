namespace WebAPI.Services;

using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;

public class UserService : IUserService
{
    private readonly PskContext _context;

    public UserService(PskContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUser(Guid id)
    {
        return await _context.Users.Where(i => i.UserId == id).FirstOrDefaultAsync();
    }



}
