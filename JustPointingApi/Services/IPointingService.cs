using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public interface IPointingService
    {
        Task ClearVotes(string teamId);

        Task ShowVotes(string teamId);

        Task CastVote(string socketId, string vote);

        Task SetAdmin(string socketId);
    }
}
