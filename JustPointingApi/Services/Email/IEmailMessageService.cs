using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Email
{
    public interface IEmailMessageService
    {
        Task<string> SendEmail(string receiverEmail, string subject, string content);
        Task SendRetroBoardInvitationEmail(string email, string boardId, string guid);
    }
}
