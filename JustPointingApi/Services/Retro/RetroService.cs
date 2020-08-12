using JustPointingApi.Models.Retro;
using JustPointingApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Retro
{
    public class RetroService : IRetroService
    {
        private readonly IRetroRepository _retroRepo;
        public RetroService(IRetroRepository retroRepo)
        {
            _retroRepo = retroRepo;
        }
        public async Task<List<RetroColumn>> GetRetroBoardDetails(int boardId)
        {
            var columns = await _retroRepo.GetRetroColumns(boardId);
            if(columns.Count > 0)
            {
                foreach(var col in columns)
                {
                    var point = await _retroRepo.GetRetroPoints(col.ColumnId);
                    if (point.Count > 0)
                    {
                        col.RetroPoints = point;
                    }
                }
            }
            return columns;
        }

        public async Task<List<RetroBoard>> GetRetroBoardsOfUser(int userId)
        {
            return await _retroRepo.GetBoardsWithUserId(userId);
        }

        public async Task<int> AddRetroPoint(RetroPoint retroPoint)
        {
            return await _retroRepo.AddRetroPoint(retroPoint);
        }
    }
}
