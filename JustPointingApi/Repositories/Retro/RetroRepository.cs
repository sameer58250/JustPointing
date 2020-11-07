using Dapper;
using JustPointingApi.Models.Retro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories.Retro
{
    public class RetroRepository : IRetroRepository
    {
        private readonly IDbConnection _db;

        public RetroRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("JustPointningConnection");
            _db = new SqlConnection(connectionString);
        }

        public async Task<int> AddRetroBoard(RetroBoard board)
        {
            var queryRes = await _db.QueryAsync<int>("CreateRetroBoard",
                 new { @boardOwner = board.BoardOwnerId, @boardTitle = board.BoardTitle },
                 commandType: CommandType.StoredProcedure);
            return queryRes.FirstOrDefault();
        }

        public async Task<int> AddRetroColumn(RetroColumn column)
        {
            var queryRes = await _db.QueryAsync<int>("AddRetroColumns",
                 new { @boardId = column.RetroBoardId, @columnTitle = column.ColumnTitle },
                 commandType: CommandType.StoredProcedure);
            return queryRes.FirstOrDefault();
        }


        public async Task<int> UpdateRetroColumn(RetroColumn column)
        {
            var queryRes = await _db.QueryAsync<int>("UpdateRetroColumn",
                 new { @columnId = column.ColumnId, @columnTitle = column.ColumnTitle },
                 commandType: CommandType.StoredProcedure);
            return queryRes.FirstOrDefault();
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
            var queryRes = await _db.QueryAsync("GetAllBoardsWithUserId",
                new
                {
                    @userId = userId
                }, commandType: CommandType.StoredProcedure);
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
            var queryRes = await _db.QueryAsync("GetRetroColumns",
                new
                {
                    @boardId = boardId
                },
                commandType: CommandType.StoredProcedure);
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
            var res = await _db.QueryMultipleAsync("GetRetroPoints",
                new
                {
                    @columnId = columnId
                },
                commandType: CommandType.StoredProcedure);
            var retroPointTbl = await res.ReadAsync();
            var retroCommentTbl = await res.ReadAsync<RetroPointComment>();
            var retroPoints = retroPointTbl.Select(point => new RetroPoint
            {
                RetroPointId = point.RetroPointId,
                RetroPointText = point.RetroPointText,
                RetroPointUserId = point.PointUserid,
                CreationDate = point.CreationDate,
                RetroColumnId = point.RetroColumnTypeId,
                RetroPointOwnerEmail = point.UserEmail
            }).ToList();

            foreach (var point in retroPoints)
            {
                point.RetroComments = retroCommentTbl.Where(
                    c => c.RetroPointId == point.RetroPointId
                    ).ToList();
            }
            return retroPoints;
        }

        public async Task<List<RetroBoard>> GetSharedBoardsWithUserId(int userId)
        {
            var queryRes = await _db.QueryAsync("GetSharedBoards",
                new
                {
                    @userId = userId
                },
                commandType: CommandType.StoredProcedure);
            return queryRes.Select(board => new RetroBoard
            {
                BoardId = board.RetroBoardId,
                BoardTitle = board.RetroBoardTitle,
                BoardOwnerId = board.RetroBoardOwner,
                CreationDate = board.CreationDate
            }).ToList();
        }

        public async Task UpdateRetroPoint(RetroPoint point)
        {
            await _db.QueryAsync<int>("UpdateRetroPoint",
                 new
                 {
                     @retroPointId = point.RetroPointId,
                     @pointText = point.RetroPointText
                 },
                 commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroPoint(RetroPoint point)
        {
            await _db.QueryAsync("DeleteRetroPoint",
                new
                {
                    @pointId = point.RetroPointId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroBoard(string boardId, int userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@boardId", boardId);
            parameters.Add("@userId", userId);
            parameters.Add("@returnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
            await _db.QueryAsync<int>("DeleteRetroBoard",
                parameters,
                commandType: CommandType.StoredProcedure);
            var res = parameters.Get<int>("@returnValue");
            if (res != 0)
            {
                throw new Exception("Failed to delete the board.");
            }
        }

        public async Task AddUserToBoard(string boardId, string userEmail)
        {
            await _db.QueryAsync("AddBoardPermission",
                new
                {
                    @boardId = boardId,
                    @userEmail = userEmail
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<List<RetroBoardUser>> GetBoardUsers(int boardId)
        {
            var res = await _db.QueryAsync<RetroBoardUser>("GetBoardUsers",
                new
                {
                    @boardId = boardId
                },
                commandType: CommandType.StoredProcedure);
            return res.ToList();
        }

        public async Task UpdateRetroBoard(RetroBoard board)
        {
            await _db.QueryAsync("UpdateRetroBoard",
                new
                {
                    @title = board.BoardTitle,
                    @boardId = board.BoardId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<RetroPointComment> AddRetroPointComment(RetroPointComment comment)
        {
            var res = await _db.QueryAsync<RetroPointComment>("AddRetroPointComment",
                new
                {
                    @userId = comment.CommentOwnerId,
                    @creationDate = DateTime.Now,
                    @retroPointId = comment.RetroPointId,
                    @retroColumnId = comment.RetroColumnId,
                    @commentText = comment.CommentText
                },
                commandType: CommandType.StoredProcedure);
            return res.FirstOrDefault();
        }

        public async Task UpdateRetroPointComment(RetroPointComment comment)
        {
            await _db.QueryAsync("UpdateRetroPointComment",
                new
                {
                    @commentId = comment.CommentId,
                    @commentText = comment.CommentText
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroPointComment(RetroPointComment comment)
        {
            await _db.QueryAsync("DeleteRetroPointComment",
                new
                {
                    @commentId = comment.CommentId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroColumn(RetroColumn column)
        {
            await _db.QueryAsync("DeleteRetroColumn",
                new
                {
                    @columnId = column.ColumnId
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
