using JustPointingApi.Models.Account;
using JustPointingApi.Models.Retro;
using JustPointingApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Retro
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepo;
        public LoginService(ILoginRepository repo)
        {
            _loginRepo = repo;
        }

        public async Task<User> CreateUser(User user)
        {
            return await _loginRepo.CreateUser(user);
        }

        public async Task<User> Login(User user)
        {
            return await _loginRepo.Login(user);
        }
    }
}
