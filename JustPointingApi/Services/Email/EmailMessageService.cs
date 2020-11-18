using JustPointingApi.Models.Email;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services.Email
{
    public class EmailMessageService : IEmailMessageService
    {
        private readonly EmailNotificationMetadata _emailMetadata;
        public EmailMessageService(EmailNotificationMetadata emailMetadata)
        {
            _emailMetadata = emailMetadata;
        }
        public async Task<string> SendEmail(string receiverEmail, string subject, string content)
        {
            EmailMessage emailMessage = new EmailMessage();
            emailMessage.Sender = new MailboxAddress("JustPointing", _emailMetadata.Sender);
            emailMessage.Reciever = new MailboxAddress("Self", receiverEmail);
            emailMessage.Subject = subject;
            emailMessage.Content = content;
            var mimeMessage = _createMimeMessageFromEmailMessage(emailMessage);
            try
            {
                using (SmtpClient smtpClient = new SmtpClient())
                {
                    await smtpClient.ConnectAsync(_emailMetadata.SmtpServer,
                    _emailMetadata.Port, true);
                    await smtpClient.AuthenticateAsync(_emailMetadata.UserName,
                    _emailMetadata.Password);
                    await smtpClient.SendAsync(mimeMessage);
                    await smtpClient.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {

            }
            return "Email sent successfully";
        }

        public async Task SendRetroBoardInvitationEmail(string email, string boardId, string guid)
        {
            string URI = _emailMetadata.RetroViewURL + boardId + "?email=" + email + "&token=" + guid;
            await SendEmail(email, "You are invited to JustPointing Retro board: " + boardId, URI);
        }

        private MimeMessage _createMimeMessageFromEmailMessage(EmailMessage message)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(message.Sender);
            mimeMessage.To.Add(message.Reciever);
            mimeMessage.Subject = message.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = message.Content;
            mimeMessage.Body = builder.ToMessageBody();
            return mimeMessage;
        }
    }
}
