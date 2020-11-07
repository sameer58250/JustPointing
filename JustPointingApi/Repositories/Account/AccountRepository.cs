using Dapper;
using JustPointingApi.Models.Account;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories.Account
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IDbConnection _db;
        public AccountRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("JustPointningConnection");
            _db = new SqlConnection(connectionString);
        }
        public async Task<List<User>> SearchUsers(string searchText)
        {
            var res = await _db.QueryAsync<User>("FilterUsersByEmail", new { @email = searchText }, commandType: CommandType.StoredProcedure);
            return res.ToList();
        }
    }
}
