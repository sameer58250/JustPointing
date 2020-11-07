using JustPointingApi.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Account
{
    public interface IAccountService
    {
        Task<List<User>> SearchUsers(string searchText);
    }
}
