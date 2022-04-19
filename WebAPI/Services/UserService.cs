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

    public async Task<User> GetUser(Guid id)
    {
        return await _context.Users.Where(i => i.UserId == id).FirstOrDefaultAsync();
    }

    public async Task<List<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task CreateUser(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
