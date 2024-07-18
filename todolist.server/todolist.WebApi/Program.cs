using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Todolist.BLL.Interfaces;
using Todolist.BLL.Models;
using Todolist.BLL.Services;
using Todolist.DAL.Data;
using Todolist.DAL.Repositories.Interfaces;
using Todolist.DAL.Repositories.Realizations;
using Todolist.WebApi.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddSerilog();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"])
);

builder.Services.AddScoped<ITasksRepository, TasksRepository>();
builder.Services.AddScoped<ITasksService, TasksService>();
builder.Services.AddScoped<IValidator<FullTask>, TaskValidator>();
builder.Services.AddScoped<IValidator<CreateTaskModel>, CreateTaskValidator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseHttpsRedirection();

app.Run();
