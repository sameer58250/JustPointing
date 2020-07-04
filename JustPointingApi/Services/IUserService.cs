using JustPointing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public interface IUserService
    {
        Task<UserData> RemoveUser(string socketId);

        Task SetAdmin(string socketId);
    }
}
