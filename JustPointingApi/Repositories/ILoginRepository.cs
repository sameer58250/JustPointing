using JustPointingApi.Models.Account;
using JustPointingApi.Models.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories
{
    public interface ILoginRepository
    {
        Task<RetroBoardUser> Login(User user);
        Task<User> CreateUser(User user);
    }
}
