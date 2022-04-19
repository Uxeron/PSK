namespace WebAPI.Services.Interfaces;
namespace WebAPI.Services;

using System;
using System.Threading.Tasks;
using Data.Models;

public interface IUserService
{
    Task<User> GetUser(Guid id);
    Task<List<User>> GetUsers();
    Task CreateUser(User user);
}
