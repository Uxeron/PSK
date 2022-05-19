namespace WebAPI.Services;

using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Services.Interfaces;

public class UserService : IUserService
{
    private readonly PskContext _context;
    private readonly IAddressService _addressService;

    public UserService(PskContext context, IAddressService addressService)
    {
        _context = context;
        _addressService = addressService;
    }

    public async Task<User?> GetUser(string id) =>
        await _context.Users
            .Include(u => u.Address)
            .Where(i => i.UserId == id)
            .Include(i => i.Address)
            .FirstOrDefaultAsync();

    public async Task CreateUser(NewUser newUser)
    {
        Address address = await _addressService.CreateAddress(newUser.Address);
        User user = new()
        {
            Address = address,
            UserId = newUser.UserId,
            Name = newUser.Name,
            Email = newUser.Email,
            Surname = newUser.Surname,
            PhoneNumber = newUser.PhoneNumber

        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}
