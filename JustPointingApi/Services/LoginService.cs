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
        public async Task<RetroBoardUser> Login(string email)
        {
            return await _loginRepo.Login(email);
        }
    }
}
