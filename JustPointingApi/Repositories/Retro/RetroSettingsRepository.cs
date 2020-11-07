using JustPointingApi.Models.Retro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace JustPointingApi.Repositories.Retro
{
    public class RetroSettingsRepository : IRetroSettingsRepository
    {
        private readonly IDbConnection _db;
        public RetroSettingsRepository(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("JustPointningConnection");
            _db = new SqlConnection(connectionString);
        }
        public async Task<RetroBoardTemplate> AddRetroBoardTemplate(RetroBoardTemplate template)
        {
            var res = await _db.QueryAsync<RetroBoardTemplate>("AddRetroBoardTemplate",
                new
                {
                    @templateOwnerId = template.TemplateOwnerId,
                    @templateName = template.TemplateName,
                    @creationDate = DateTime.Now,
                    @isDefault = template.IsDefault
                },
                commandType: CommandType.StoredProcedure);
            return res.FirstOrDefault();
        }

        public async Task<RetroBoardTemplateColumn> AddRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            var res = await _db.QueryAsync<RetroBoardTemplateColumn>("AddRetroBoardTemplateColumn",
                new
                {
                    @retroTemplateColumnName = column.RetroTemplateColumnName,
                    @retroBoardTemplateId = column.RetroBoardTemplateId
                },
                commandType: CommandType.StoredProcedure);
            return res.FirstOrDefault();
        }

        public async Task<RetroBoardTemplateUser> AddRetroBoardTemplateUser(RetroBoardTemplateUser templateUser)
        {
            var res = await _db.QueryAsync<RetroBoardTemplateUser>("AddRetroBoardTemplateUser",
                new
                {
                    @userEmail = templateUser.UserEmail,
                    @retroBoardTemplateId = templateUser.RetroBoardTemplateId
                },
                commandType: CommandType.StoredProcedure);
            return res.FirstOrDefault();
        }

        public async Task DeleteRetroBoardTemplate(RetroBoardTemplate template)
        {
            await _db.QueryAsync("DeleteRetroBoardTemplate",
                new
                {
                    @retroBoardTemplateId = template.RetroBoardTemplateId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            await _db.QueryAsync("DeleteRetroBoardTemplateColumn",
                new
                {
                    @retroTemplateColumnId = column.RetroTemplateColumnId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteRetroBoardTemplateUser(RetroBoardTemplateUser templateUser)
        {
            await _db.QueryAsync("DeleteRetroBoardTemplateUser",
                new
                {
                    @id = templateUser.Id
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task SetDefaultTemplate(RetroBoardTemplate template)
        {
            await _db.QueryAsync("SetDefaultTemplate",
                new
                {
                    @retroBoardTemplateId = template.RetroBoardTemplateId,
                    @userId = template.TemplateOwnerId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            await _db.QueryAsync("UpdateRetroBoardTemplateColumn",
                new
                {
                    @retroTemplateColumnName = column.RetroTemplateColumnName,
                    @retroTemplateColumnId = column.RetroTemplateColumnId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateRetroBoardTemplateName(RetroBoardTemplate template)
        {
            await _db.QueryAsync("UpdateRetroBoardTemplate",
                new
                {
                    @templateName = template.TemplateName,
                    @retroBoardTemplateId = template.RetroBoardTemplateId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<List<RetroBoardTemplate>> GetRetroBoardTemplates(int userid)
        {
            var res = await _db.QueryAsync<RetroBoardTemplate>("GetRetroBoardTemplates",
                new
                {
                    @templateOwnerId = userid
                },
                commandType: CommandType.StoredProcedure);
            List<RetroBoardTemplate> templates = res.ToList();
            foreach (var template in templates)
            {
                var multiQueryRes = await _db.QueryMultipleAsync("GetRetroBoardTemplateDetails",
                    new
                    {
                        @retroBoardTemplateId = template.RetroBoardTemplateId
                    },
                    commandType: CommandType.StoredProcedure);
                var columns = await multiQueryRes.ReadAsync<RetroBoardTemplateColumn>();
                var users = await multiQueryRes.ReadAsync<RetroBoardTemplateUser>();
                template.TemplateColumns = columns.ToList();
                template.TemplateUsers = users.ToList();
            }
            return templates;
        }
    }
}
