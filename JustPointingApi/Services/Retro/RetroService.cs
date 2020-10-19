using JustPointing.WebSocketManager;
using JustPointingApi.Handlers;
using JustPointingApi.Models.Retro;
using JustPointingApi.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Retro
{
    public class RetroService : IRetroService
    {
        private readonly IRetroRepository _retroRepo;
        private readonly SocketHandler _socketHandler;
        public RetroService(IRetroRepository retroRepo,
            RetroSocketHandler socketHandler)
        {
            _retroRepo = retroRepo;
            _socketHandler = socketHandler;
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
            var retroId = await _retroRepo.AddRetroPoint(retroPoint);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, retroPoint.RetroBoardId);
            return retroId;
        }

        public async Task<int> AddRetroBoard(RetroBoard board)
        {
            var boardId = await _retroRepo.AddRetroBoard(board);
            //await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardAdded, boardId);
            return boardId;
        }

        public async Task<int> AddRetroColumn(RetroColumn column)
        {
            var columnId = await _retroRepo.AddRetroColumn(column);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, column.RetroBoardId);
            return columnId;
        }

        public async Task<int> UpdateRetroColumn(RetroColumn column)
        {
            var res = await _retroRepo.UpdateRetroColumn(column);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, column.RetroBoardId);
            return res;
        }

        public async Task UpdateRetroPoint(RetroPoint point)
        {
            await _retroRepo.UpdateRetroPoint(point);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, point.RetroBoardId);
        }

        public async Task DeleteRetroPoint(RetroPoint point)
        {
            await _retroRepo.DeleteRetroPoint(point);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, point.RetroBoardId);
        }

        public async Task DeleteRetroBoard(string boardId, int userId)
        {
            await _retroRepo.DeleteRetroBoard(boardId, userId);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardUpdated, Convert.ToInt32(boardId));
        }

        public async Task AddUserToBoard(string boardId, string userEmail)
        {
            await _retroRepo.AddUserToBoard(boardId, userEmail);
            //await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardAdded, Convert.ToInt32(boardId));
        }

        public async Task<List<RetroBoard>> GetSharedBoards(int userId)
        {
            return await _retroRepo.GetSharedBoardsWithUserId(userId);
        }

        public async Task<List<RetroBoardUser>> GetBoardUsers(int boardId)
        {
            return await _retroRepo.GetBoardUsers(boardId);
        }

        private async Task _sendUpdateToActiveSocketConnections(RetroBoardActionTypes actionType, int boardId)
        {
            try
            {
                var users = await _retroRepo.GetBoardUsers(boardId);
                if (users != null)
                {
                    foreach (var user in users)
                    {
                        await _sendUpdateToUser(actionType, boardId, user.UserId);
                    }
                }
            }
            catch
            {

            }
        }

        private async Task _sendUpdateToUser(RetroBoardActionTypes actionType, int boardId, int userId)
        {
            var message = JsonConvert.SerializeObject(new { action = actionType.ToString(), boardid = boardId });
            await _socketHandler.SendMessage(userId.ToString(), message);
        }

        public async Task UpdateRetroBoard(RetroBoard board)
        {
            await _retroRepo.UpdateRetroBoard(board);
        }
    }
}
