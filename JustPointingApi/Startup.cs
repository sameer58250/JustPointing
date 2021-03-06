using System;
using JustPointing.Handlers;
using JustPointing.Models;
using JustPointing.Services;
using JustPointing.WebSocketManager;
using JustPointingApi.Handlers;
using JustPointingApi.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace JustPointing
{
    public class Startup
    {
        private readonly string _myCorsPolicy = "MyCorsPolicy";
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            var allowedHosts = Configuration.GetSection("AllowedHosts").Value;
            services.AddCors(options =>
            {
                options.AddPolicy(name: _myCorsPolicy,
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });
            services.AddControllers()
                .AddNewtonsoftJson();
            services.AddHttpContextAccessor();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.IsEssential = true;
                options.Cookie.HttpOnly = true;
            });
            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
            services.RegisterWebSocketManager();
            services.RegisterDataObject();
            services.RegisterService();
            services.RegisterRepositories();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseWebSockets();
            app.MapSocket("/point", serviceProvider.GetService<WebSocketPointingHandler>());
            app.MapSocket("/retroSocket", serviceProvider.GetService<RetroSocketHandler>());
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors(_myCorsPolicy);
            app.UseSession();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("JustPointing API");
                });
                endpoints.MapControllers();
            });
        }
    }
}
