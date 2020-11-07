using JustPointingApi.Models.Retro;
using JustPointingApi.Repositories.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Retro
{
    public class RetroSettingsService : IRetroSettingsService
    {
        private readonly IRetroSettingsRepository _retroRepo;

        public RetroSettingsService(IRetroSettingsRepository retroRepo)
        {
            _retroRepo = retroRepo;
        }
        public async Task<RetroBoardTemplate> AddRetroBoardTemplate(RetroBoardTemplate template)
        {
            return await _retroRepo.AddRetroBoardTemplate(template);
        }

        public async Task<RetroBoardTemplateColumn> AddRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            return await _retroRepo.AddRetroBoardTemplateColumn(column);
        }

        public async Task<RetroBoardTemplateUser> AddRetroBoardTemplateUser(RetroBoardTemplateUser templateUser)
        {
            return await _retroRepo.AddRetroBoardTemplateUser(templateUser);
        }

        public async Task DeleteRetroBoardTemplate(RetroBoardTemplate template)
        {
            await _retroRepo.DeleteRetroBoardTemplate(template);
        }

        public async Task DeleteRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            await _retroRepo.DeleteRetroBoardTemplateColumn(column);
        }

        public async Task DeleteRetroBoardTemplateUser(RetroBoardTemplateUser templateUser)
        {
            await _retroRepo.DeleteRetroBoardTemplateUser(templateUser);
        }

        public async Task<List<RetroBoardTemplate>> GetRetroBoardTemplates(int userid)
        {
            return await _retroRepo.GetRetroBoardTemplates(userid);
        }

        public async Task SetDefaultTemplate(RetroBoardTemplate template)
        {
            await _retroRepo.SetDefaultTemplate(template);
        }

        public async Task UpdateRetroBoardTemplateColumn(RetroBoardTemplateColumn column)
        {
            await _retroRepo.UpdateRetroBoardTemplateColumn(column);
        }

        public async Task UpdateRetroBoardTemplateName(RetroBoardTemplate template)
        {
            await _retroRepo.UpdateRetroBoardTemplateName(template);
        }
    }
}
