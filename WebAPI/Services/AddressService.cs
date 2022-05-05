namespace WebAPI.Services;
using WebAPI.Services.Interfaces;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;

public class AddressService : IAddressService
{
    private readonly PskContext _context;

    public AddressService(PskContext context)
    {
        _context = context;
    }

    public async Task<Address?> GetAddress(Guid id) => 
        await _context.Address
            .Where(i => i.AddressId == id)
            .FirstOrDefaultAsync();
}
