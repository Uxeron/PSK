namespace WebAPI.Services.Interfaces;
using Data.Models;
using WebAPI.Models;

public interface IAddressService
{
    Task<Address?> GetAddress(string userId);
    Task<Address> CreateAddress(string userId, NewAddress newAddress);
}
