namespace WebAPI.Services;
using WebAPI.Services.Interfaces;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Logger;
using Autofac.Extras.DynamicProxy;

[Intercept(typeof(LoggerInterceptor))]
public class AddressService : IAddressService
{
    private readonly PskContext _context;

    public AddressService(PskContext context)
    {
        _context = context;

    }

    public async Task<Address> CreateAddress(string userId, NewAddress newAddress)
    {
        Address address = new()
        {
            Country = newAddress.Country,
            City = newAddress.City,
            StreetName = newAddress.StreetName,
        };

        await _context.Address.AddAsync(address);
        await _context.SaveChangesAsync();

        return address;
    }



    public async Task<Address?> GetAddress(string userId)
    {
        var user = await _context.Users.Where(u => u.UserId == userId).Include(i => i.Address).FirstOrDefaultAsync();
        return user.Address;
    }
}
