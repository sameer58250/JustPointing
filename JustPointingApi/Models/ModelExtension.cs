using JustPointingApi.Models.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public static class ModelExtension
    {
        public static IServiceCollection RegisterDataObject(this IServiceCollection services, IConfiguration configuration)
        {
            var notificationMetadata = configuration.GetSection("EmailNotificationMetadata").Get<EmailNotificationMetadata>();
            services
                .AddSingleton<TeamsDataManager>()
                .AddSingleton<StoryPointManager>()
                .AddSingleton(notificationMetadata);
            return services;
        }
    }
}
