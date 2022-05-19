namespace WebAPI.Services.Interfaces;
using Data.Models;
using WebAPI.Models;

public interface IAddressService
{
    Task<Address?> GetAddress(Guid id);
    Task<Address> CreateAddress(NewAddress newAddress);
}
