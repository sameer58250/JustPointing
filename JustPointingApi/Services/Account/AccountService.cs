using JustPointingApi.Models.Account;
using JustPointingApi.Repositories.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepo;

        public AccountService(IAccountRepository accountRepo)
        {
            _accountRepo = accountRepo;
        }
        public async Task<List<User>> SearchUsers(string searchText)
        {
            return await _accountRepo.SearchUsers(searchText);
        }
    }
}
