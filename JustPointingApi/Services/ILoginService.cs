using JustPointingApi.Models.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public interface ILoginService
    {
        Task<RetroBoardUser> Login(string email);
        Task<RetroBoardUser> CreateUser(string email);
    }
}
