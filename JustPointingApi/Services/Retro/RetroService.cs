using JustPointing.WebSocketManager;
using JustPointingApi.Handlers;
using JustPointingApi.Models.Retro;
using JustPointingApi.Repositories.Retro;
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
        private readonly IRetroSettingsService _retroSettingsService;
        public RetroService(IRetroRepository retroRepo,
            RetroSocketHandler socketHandler,
            IRetroSettingsService retroSettingsService)
        {
            _retroRepo = retroRepo;
            _socketHandler = socketHandler;
            _retroSettingsService = retroSettingsService;
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

        private async Task AddDefaultRetroTemplate(int boardOwnerId)
        {
            RetroBoardTemplate retroBoardTemplate = new RetroBoardTemplate
            {
                TemplateOwnerId = boardOwnerId,
                TemplateName = "Default template",
                CreationDate = DateTime.UtcNow,
                IsDefault = true
            };

            var defaultRetroBoardTemplate =
                await _retroSettingsService.AddRetroBoardTemplate(retroBoardTemplate);

            RetroBoardTemplateColumn defaultColumn1 = new RetroBoardTemplateColumn
            {
                RetroTemplateColumnName = "What went well?",
                RetroBoardTemplateId = defaultRetroBoardTemplate.RetroBoardTemplateId
            };
            RetroBoardTemplateColumn defaultColumn2 = new RetroBoardTemplateColumn
            {
                RetroTemplateColumnName = "What could be done better?",
                RetroBoardTemplateId = defaultRetroBoardTemplate.RetroBoardTemplateId
            };
            RetroBoardTemplateColumn defaultColumn3 = new RetroBoardTemplateColumn
            {
                RetroTemplateColumnName = "Action items",
                RetroBoardTemplateId = defaultRetroBoardTemplate.RetroBoardTemplateId
            };

            await _retroSettingsService.AddRetroBoardTemplateColumn(defaultColumn1);
            await _retroSettingsService.AddRetroBoardTemplateColumn(defaultColumn2);
            await _retroSettingsService.AddRetroBoardTemplateColumn(defaultColumn3);
        }

        public async Task<int> AddRetroBoard(RetroBoard board)
        {
            var retroBoardTemplatesForBoardOwner =
                await _retroSettingsService.GetRetroBoardTemplates(board.BoardOwnerId);

            if (!retroBoardTemplatesForBoardOwner.Any())
            {
                await AddDefaultRetroTemplate(board.BoardOwnerId);
            }

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
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardAdded, Convert.ToInt32(boardId));
        }

        public async Task AddUserToBoard(string boardId, string userEmail)
        {
            await _retroRepo.AddUserToBoard(boardId, userEmail);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardAdded, Convert.ToInt32(boardId));
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardUserAdded, Convert.ToInt32(boardId));
        }

        public async Task<List<RetroBoard>> GetSharedBoards(int userId)
        {
            return await _retroRepo.GetSharedBoardsWithUserId(userId);
        }

        public async Task<List<RetroBoardUser>> GetBoardUsers(int boardId)
        {
            return await _retroRepo.GetBoardUsers(boardId);
        }

        public async Task UpdateRetroBoard(RetroBoard board)
        {
            await _retroRepo.UpdateRetroBoard(board);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardUpdated, Convert.ToInt32(board.BoardId));
        }

        public async Task<RetroPointComment> AddRetroPointComment(RetroPointComment comment)
        {
            var res = await _retroRepo.AddRetroPointComment(comment);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, comment.RetroBoardId);
            return res;
        }

        public async Task UpdateRetroPointComment(RetroPointComment comment)
        {
            await _retroRepo.UpdateRetroPointComment(comment);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, comment.RetroBoardId);
        }

        public async Task DeleteRetroPointComment(RetroPointComment comment)
        {
            await _retroRepo.DeleteRetroPointComment(comment);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, comment.RetroBoardId);
        }

        public async Task DeleteRetroColumn(RetroColumn column)
        {
            await _retroRepo.DeleteRetroColumn(column);
            await _sendUpdateToActiveSocketConnections(RetroBoardActionTypes.BoardDetailsUpdated, column.RetroBoardId);
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
    }
}
