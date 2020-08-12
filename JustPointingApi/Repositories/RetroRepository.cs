using Dapper;
using JustPointingApi.Models.Retro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories
{
    public class RetroRepository : IRetroRepository
    {
        private readonly IDbConnection _db;

        public RetroRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("JustPointningConnection");
            _db = new SqlConnection(connectionString);
        }

        public async Task<int> AddRetroPoint(RetroPoint retroPoint)
        {
           var queryRes = await _db.QueryAsync<int>("AddRetroPoints",
                new { @userId = retroPoint.RetroPointUserId, @columnId = retroPoint.RetroColumnId, @pointText = retroPoint.RetroPointText },
                commandType: CommandType.StoredProcedure);
            return queryRes.FirstOrDefault();
        }

        public async Task<List<RetroBoard>> GetBoardsWithUserId(int userId)
        {
            var queryRes = await _db.QueryAsync("GetAllBoardsWithUserId", new { @userId = userId }, commandType: CommandType.StoredProcedure);
            return queryRes.Select(board => new RetroBoard
            {
                BoardId = board.RetroBoardId,
                BoardTitle = board.RetroBoardTitle,
                BoardOwnerId = board.RetroBoardOwner,
                CreationDate = board.CreationDate
            }).ToList();
        }

        public async Task<List<RetroColumn>> GetRetroColumns(int boardId)
        {
            var queryRes = await _db.QueryAsync("GetRetroColumns", new { @boardId = boardId }, commandType: CommandType.StoredProcedure);
            return queryRes.Select(col => new RetroColumn
            {
                ColumnId = col.ColumnTypeId,
                ColumnTitle = col.ColumnTitle,
                RetroBoardId = col.RetroBoardId,
                CreationDate = col.CreationDate
            }).ToList();
        }

        public async Task<List<RetroPoint>> GetRetroPoints(int columnId)
        {
            var queryRes = await _db.QueryAsync("GetRetroPoints", new { @columnId = columnId }, commandType: CommandType.StoredProcedure);
            return queryRes.Select(point => new RetroPoint
            {
                RetroPointId = point.RetroPointId,
                RetroPointText = point.RetroPointText,
                RetroPointUserId = point.PointUserid,
                CreationDate = point.CreationDate,
                RetroColumnId = point.RetroColumnTypeId
            }).ToList();
        }

        public async Task<List<RetroBoard>> GetSharedBoardsWithUserId(int userId)
        {
            var queryRes = await _db.QueryAsync("GetSharedBoards", new { @userId = userId }, commandType: CommandType.StoredProcedure);
            return queryRes.Select(board => new RetroBoard
            {
                BoardId = board.RetroBoardId,
                BoardTitle = board.RetroBoardTitle,
                BoardOwnerId = board.RetroBoardOwner,
                CreationDate = board.CreationDate
            }).ToList();
        }
    }
}
