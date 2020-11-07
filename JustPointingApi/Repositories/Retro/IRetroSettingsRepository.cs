using JustPointingApi.Models.Retro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories.Retro
{
    public interface IRetroSettingsRepository
    {
        Task<RetroBoardTemplate> AddRetroBoardTemplate(RetroBoardTemplate template);
        Task DeleteRetroBoardTemplate(RetroBoardTemplate template);
        Task UpdateRetroBoardTemplateName(RetroBoardTemplate template);
        Task SetDefaultTemplate(RetroBoardTemplate template);

        Task<RetroBoardTemplateColumn> AddRetroBoardTemplateColumn(RetroBoardTemplateColumn column);
        Task DeleteRetroBoardTemplateColumn(RetroBoardTemplateColumn column);
        Task UpdateRetroBoardTemplateColumn(RetroBoardTemplateColumn column);

        Task<RetroBoardTemplateUser> AddRetroBoardTemplateUser(RetroBoardTemplateUser templateUser);
        Task DeleteRetroBoardTemplateUser(RetroBoardTemplateUser templateUser);
        Task<List<RetroBoardTemplate>> GetRetroBoardTemplates(int userid);
    }
}
