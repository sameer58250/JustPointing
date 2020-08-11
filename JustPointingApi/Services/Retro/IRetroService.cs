using JustPointingApi.Models.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Retro
{
    public interface IRetroService
    {
        Task<List<RetroBoard>> GetRetroBoardsOfUser(int userId);
        Task<List<RetroColumn>> GetRetroBoardDetails(int boardId);
    }
}
