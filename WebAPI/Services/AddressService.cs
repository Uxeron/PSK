namespace WebAPI.Services;
using WebAPI.Services.Interfaces;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

public class AddressService : IAddressService
{
    private readonly PskContext _context;

    public AddressService(PskContext context)
    {
        _context = context;

    }

    public async Task<Address> CreateAddress(NewAddress newAddress)
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



    public async Task<Address?> GetAddress(Guid id) => 
        await _context.Address
            .Where(i => i.AddressId == id)
            .FirstOrDefaultAsync();
}
