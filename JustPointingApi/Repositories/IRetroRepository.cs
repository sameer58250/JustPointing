using JustPointingApi.Models.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories
{
    public interface IRetroRepository
    {
        Task<List<RetroBoard>> GetBoardsWithUserId(int userId);
        Task<List<RetroBoard>> GetSharedBoardsWithUserId(int userId);
        Task<List<RetroColumn>> GetRetroColumns(int boardId);
        Task<List<RetroPoint>> GetRetroPoints(int columnId);
    }
}
