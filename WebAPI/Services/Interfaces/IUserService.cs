namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;

public interface IUserService
{
    Task<User?> GetUser(string id);
    Task CreateUser(User user);
}
