using JustPointingApi.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Services
{
    public static class ServicesExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection services)
        {
            services.AddTransient<IHomeService, HomeService>();
            services.AddTransient<IPointingService, PointingService>();
            return services;
        }
    }
}
