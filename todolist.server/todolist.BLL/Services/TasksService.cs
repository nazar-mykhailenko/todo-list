using AutoMapper;
using Microsoft.Extensions.Logging;
using Todolist.BLL.Interfaces;
using Todolist.BLL.Models;

namespace Todolist.BLL.Services;

public class TasksService : ITasksService
{
    private readonly IMapper mapper;
    private readonly ILogger<TasksService> logger;

    public TasksService(IMapper mapper, ILogger<TasksService> logger)
	{
        this.mapper = mapper;
        this.logger = logger;
    }

    public Task Create(FullTask taskModel)
    {
        throw new NotImplementedException();
    }

    public Task Delete(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ShortTask> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<FullTask> GetById()
    {
        throw new NotImplementedException();
    }

    public Task Update(FullTask taskModel)
    {
        throw new NotImplementedException();
    }
}
