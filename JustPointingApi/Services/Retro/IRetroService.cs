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
        Task<List<RetroBoard>> GetSharedBoards(int userId);
        Task<List<RetroColumn>> GetRetroBoardDetails(int boardId);
        Task<int> AddRetroPoint(RetroPoint retroPoint);
        Task<int> AddRetroBoard(RetroBoard board);
        Task<int> AddRetroColumn(RetroColumn column);
        Task<int> UpdateRetroColumn(RetroColumn column);
        Task UpdateRetroPoint(RetroPoint point);
        Task DeleteRetroPoint(RetroPoint point);
        Task DeleteRetroBoard(string boardId, int userId);
        Task AddUserToBoard(string boardId, string userEmail);
        Task<List<RetroBoardUser>> GetBoardUsers(int boardId);
        Task UpdateRetroBoard(RetroBoard board);
        Task<RetroPointComment> AddRetroPointComment(RetroPointComment comment);
        Task UpdateRetroPointComment(RetroPointComment comment);
        Task DeleteRetroPointComment(RetroPointComment comment);
        Task DeleteRetroColumn(RetroColumn column);
    }
}
