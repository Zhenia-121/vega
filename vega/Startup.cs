using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using vega.Core;
using vega.DB;
using vega.Persistence;

namespace vega
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddCors(options =>
            // {
            //     options.AddPolicy("AllowAll", p =>
            //     {
            //         p.AllowAnyOrigin()
            //         .AllowAnyHeader()
            //         .AllowAnyMethod();
            //     });
            // });
            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            string connection = Configuration.GetConnectionString("Default");
            services.AddDbContext<VegaDbContext>(options => options.UseSqlServer(connection));
            services.AddAutoMapper();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // app.UseCors(builder =>
            // builder.WithOrigins("http://localhost:5000", "http://www.myclientserver.com")
            //     .AllowAnyHeader()
            //     .AllowAnyMethod());
            app.UseCors(builder => builder.AllowAnyOrigin());
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
