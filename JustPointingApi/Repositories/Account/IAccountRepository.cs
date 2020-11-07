using JustPointingApi.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories.Account
{
    public interface IAccountRepository
    {
        Task<List<User>> SearchUsers(string searchText);
    }
}
