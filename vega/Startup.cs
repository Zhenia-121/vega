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
using vega.Models;
using vega.Persistence;
using vega.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using FluentValidation.AspNetCore;
using System.Text;
using System;
using System.Net;
using Microsoft.AspNetCore.WebSockets.Internal;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Security.Claims;
using vega.Services;

namespace vega
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddOptions();
            services.Configure<PhotoSettings>(Configuration.GetSection(nameof(PhotoSettings)));
            services.Configure<InitialAuthSettings>(Configuration.GetSection(nameof(InitialAuthSettings)));

            var jwtAppSettingOptions = Configuration.GetSection(nameof(AuthOptions));
            services.Configure<AuthOptions>(jwtAppSettingOptions);

            // scoped - for each http-request the new release object
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddCors();

            string connection = Configuration.GetConnectionString("Default");
            services.AddDbContext<VegaDbContext>(options => options.UseSqlServer(connection));


             //настройка политики паролей
            var builder = services.AddIdentityCore<Account>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<VegaDbContext>().AddDefaultTokenProviders();
            services.AddIdentity<Account, IdentityRole>()
                .AddEntityFrameworkStores<VegaDbContext>();
           


            services.AddAutoMapper();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp";
            });

            services.AddMvc()
                // .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>())
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

                // Get options from app settings
            
            var appSettings = jwtAppSettingOptions.Get<AuthOptions>();
            var key = Encoding.ASCII.GetBytes(appSettings.KEY);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidIssuer = appSettings.ISSUER,

                ValidateAudience = false,
                ValidAudience = appSettings.AUDIENCE,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                // RequireExpirationTime = false,
                ValidateLifetime = true,
                // ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).
            AddJwtBearer(options =>
            {
                // configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(AuthOptions.ISSUER)];
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = tokenValidationParameters;
                options.IncludeErrorDetails = true;
                options.SaveToken = true;
            });

            // services.AddAuthorization(options =>
            // {
            //     options.AddPolicy("user", policy => policy.RequireRole("admin", "user"));
            //     options.AddPolicy("admin", policy => policy.RequireClaim(ClaimsIdentity.DefaultRoleClaimType, "admin"));
            // });

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
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // app.UseCors(builder =>
            // builder.WithOrigins("http://localhost:5000", "http://www.myclientserver.com")
            //     .AllowAnyHeader()
            //     .AllowAnyMethod());
            

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
            }
                );
            app.UseAuthentication();
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
