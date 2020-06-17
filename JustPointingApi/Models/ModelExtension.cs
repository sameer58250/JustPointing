using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public static class ModelExtension
    {
        public static IServiceCollection RegisterDataObject(this IServiceCollection services)
        {
            services
                .AddSingleton<TeamsDataManager>()
                .AddSingleton<StoryPointManager>();
            return services;
        }
    }
}
