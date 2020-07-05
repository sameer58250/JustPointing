using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JustPointing.Handlers;
using JustPointing.Models;
using JustPointing.Services;
using JustPointing.WebSocketManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace JustPointing
{
    public class Startup
    {
        private readonly string _myCorsPolicy = "MyCorsPolicy";
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: _myCorsPolicy,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000/")
                        .AllowAnyOrigin()
                        .AllowAnyHeader();
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
            services.RegisterWebSocketManager();
            services.RegisterDataObject();
            services.RegisterService();
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
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors(_myCorsPolicy);
            app.UseSession();

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
