using Backend.Data;
using Backend.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddWalletSwaggerGen();
builder.Services.AddWalletCORS();


builder.Services.AddDbContext<WalletContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("WalletContext"));
});



var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(o =>
    {
        o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
        o.EnableTryItOutByDefault();
    });
//}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
