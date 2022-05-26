namespace WebAPI.Services.Interfaces;
using Data.Models;
using WebAPI.Models;

public interface IAddressService
{
    Task<Address?> GetAddress(string userId, Guid id);
    Task<Address> CreateAddress(string userId, NewAddress newAddress);
}
