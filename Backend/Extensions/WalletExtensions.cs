using Backend.Models;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace Backend.Extensions
{
    public static class WalletExtensions
    {

        public static void AddWalletSwaggerGen(this IServiceCollection Services)
        {
            // prilagodba za dokumentaciju, čitati https://medium.com/geekculture/customizing-swagger-in-asp-net-core-5-2c98d03cbe52

            Services.AddSwaggerGen(sgo =>
            { // sgo je instanca klase SwaggerGenOptions
              // čitati https://devintxcontent.blob.core.windows.net/showcontent/Speaker%20Presentations%20Fall%202017/Web%20API%20Best%20Practices.pdf
                var o = new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "Wallet API",
                    Version = "v1",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Email = "rebolj.josip031@gmail.com",
                        Name = "Josip Rebolj"
                    },
                    Description = "Documentation for Wallet API",
                    License = new Microsoft.OpenApi.Models.OpenApiLicense()
                    {
                        Name = "Educational licence"
                    }
                };
                sgo.SwaggerDoc("v1", o);


                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

            });

        }


        public static void AddWalletCORS(this IServiceCollection Services)
        {
            // Svi se od svuda na sve moguće načine mogu spojitina naš API
            // Čitati https://code-maze.com/aspnetcore-webapi-best-practices/

            Services.AddCors(opcije =>
            {
                opcije.AddPolicy("CorsPolicy",
                    builder =>
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );

            });

        }
    }
}