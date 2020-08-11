using Dapper;
using JustPointingApi.Models.Retro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IDbConnection _db;
        public LoginRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("JustPointningConnection");
            _db = new SqlConnection(connectionString);
        }
        public async Task<RetroBoardUser> Login(string email)
        {
            var queryRes = await _db.QueryAsync("LoginUser", new { @userEmail = email }, commandType: CommandType.StoredProcedure);
            return queryRes.Select(
                user => new RetroBoardUser
                {
                    UserEmail = user.UserEmail,
                    UserId = user.Id
                }).FirstOrDefault();
        }
    }
}
