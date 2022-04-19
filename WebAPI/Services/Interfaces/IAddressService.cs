namespace WebAPI.Services.Interfaces;
using Data.Models;

public interface IAddressService
{
    Task<Address?> GetAddress(Guid id);
}
