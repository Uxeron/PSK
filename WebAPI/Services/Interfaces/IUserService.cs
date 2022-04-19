namespace WebAPI.Services.Interfaces;

using Data.Models;

public interface IUserService
{
    Task<User?> GetUser(Guid id);
}
