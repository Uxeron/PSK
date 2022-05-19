namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;
using WebAPI.Models;

public interface IUserService
{
    Task<User?> GetUser(string id);
    Task CreateUser(NewUser user);
}
