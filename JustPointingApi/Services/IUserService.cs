using JustPointing.Models;
using JustPointingApi.Models;
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

        Task UpdateSettings(string teamId, AdminSettings settings);
    }
}
