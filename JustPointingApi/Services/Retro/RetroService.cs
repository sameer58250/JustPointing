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

        public async Task<int> AddRetroBoard(RetroBoard board)
        {
            return await _retroRepo.AddRetroBoard(board);
        }

        public async Task<int> AddRetroColumn(RetroColumn column)
        {
            return await _retroRepo.AddRetroColumn(column);
        }

        public async Task<int> UpdateRetroColumn(RetroColumn column)
        {
            return await _retroRepo.UpdateRetroColumn(column);
        }

        public async Task UpdateRetroPoint(RetroPoint point)
        {
            await _retroRepo.UpdateRetroPoint(point);
        }

        public async Task DeleteRetroPoint(RetroPoint point)
        {
            await _retroRepo.DeleteRetroPoint(point);
        }

        public async Task DeleteRetroBoard(string boardId, int userId)
        {
            await _retroRepo.DeleteRetroBoard(boardId, userId);
        }

        public async Task AddUserToBoard(string boardId, string userEmail)
        {
            await _retroRepo.AddUserToBoard(boardId, userEmail);
        }

        public async Task<List<RetroBoard>> GetSharedBoards(int userId)
        {
            return await _retroRepo.GetSharedBoardsWithUserId(userId);
        }
    }
}
