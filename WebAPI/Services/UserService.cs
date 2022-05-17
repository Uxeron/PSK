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

    public async Task<User?> GetUser(string id) =>
        await _context.Users
            .Include(u => u.Address)
            .Where(i => i.UserId == id)
            .Include(i => i.Address)
            .FirstOrDefaultAsync();

    public async Task CreateUser(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
