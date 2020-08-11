using JustPointingApi.Services;
using JustPointingApi.Services.Retro;
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
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ILoginService, LoginService>();
            services.AddTransient<IRetroService, RetroService>();
            return services;
        }
    }
}
