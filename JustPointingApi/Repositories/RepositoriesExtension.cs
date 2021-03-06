﻿using JustPointingApi.Repositories.Account;
using JustPointingApi.Repositories.Retro;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Repositories
{
    public static class RepositoriesExtension
    {
        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            services.AddTransient<ILoginRepository, LoginRepository>();
            services.AddTransient<IRetroRepository, RetroRepository>();
            services.AddTransient<IRetroSettingsRepository, RetroSettingsRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            return services;
        }
    }
}
