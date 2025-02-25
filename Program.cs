using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.WindowsServices;
using ZitaDataSystem;
using ZitaDataSystem.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the DI container
builder.Services.AddSingleton<SessionManager>();
builder.Services.AddSingleton<SDDGService>();
builder.Services.AddSingleton<EndpointsService>();
builder.Services.AddSingleton<DatabaseBackupService>();
builder.Services.AddHostedService<Worker>(); // Background worker
builder.WebHost.UseUrls("http://localhost:8836");

// // Set the current working directory to the executable's directory
var exePath = Assembly.GetExecutingAssembly().Location;
var exeDir = Path.GetDirectoryName(exePath);
if (!string.IsNullOrEmpty(exeDir))
{
    Directory.SetCurrentDirectory(exeDir);
}

// Add controllers
builder.Services.AddControllers().AddXmlSerializerFormatters();
builder.Host.UseWindowsService();

var app = builder.Build();

// Configure the HTTP pipeline
app.UseRouting();
app.MapControllers();

// Start the database backup service
var backupService = app.Services.GetRequiredService<DatabaseBackupService>();
var timer = new System.Timers.Timer(3600000); // 1 hour interval
timer.Elapsed += (sender, e) => backupService.BackupDatabase();
timer.Start();

// Run the application
app.Run();
//app.Run($"http://localhost:{builder.Configuration["Server:Port"]}");
