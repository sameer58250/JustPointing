using Dapper;
using JustPointingApi.Models.Account;
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

        public async Task<User> CreateUser(User userDetails)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@email", userDetails.UserEmail);
            parameters.Add("@name", userDetails.Name);
            parameters.Add("@phone", userDetails.Phone);
            parameters.Add("@password", userDetails.SHA256Password);
            parameters.Add("@creationDate", DateTime.Now);
            parameters.Add("@returnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
            var user = await _db.QueryAsync<User>("CreateUser",
                parameters,
                commandType: CommandType.StoredProcedure);
            var res = parameters.Get<int>("@returnValue");
            if (res != 0)
            {
                throw new Exception("User already exists");
            }
            return user.FirstOrDefault();
        }

        public async Task<RetroBoardUser> Login(User user)
        {
            var queryRes = await _db.QueryAsync("LoginUser",
                new { @userEmail = user.UserEmail, @password = user.SHA256Password },
                commandType: CommandType.StoredProcedure);
            return queryRes.Select(
                user => new RetroBoardUser
                {
                    Name = user.Name,
                    UserEmail = user.UserEmail,
                    UserId = user.Id
                }).FirstOrDefault();
        }
    }
}
