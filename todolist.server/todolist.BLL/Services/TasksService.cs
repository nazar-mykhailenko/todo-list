using AutoMapper;
using Microsoft.Extensions.Logging;
using OneOf;
using OneOf.Types;
using Todolist.BLL.Interfaces;
using Todolist.BLL.Models;
using Todolist.DAL.Entities;
using Todolist.DAL.Repositories.Interfaces;

namespace Todolist.BLL.Services;

public class TasksService : ITasksService
{
    private readonly IMapper mapper;
    private readonly ILogger<TasksService> logger;
    private readonly ITasksRepository tasksRepository;

    public TasksService(
        IMapper mapper,
        ILogger<TasksService> logger,
        ITasksRepository tasksRepository
    )
    {
        this.mapper = mapper;
        this.logger = logger;
        this.tasksRepository = tasksRepository;
    }

    public async Task CreateAsync(CreateTaskModel taskModel)
    {
        logger.LogInformation("Start adding task");
        var taskEntity = mapper.Map<TodoTask>(taskModel);
        tasksRepository.CreateAsync(taskEntity);
        await tasksRepository.SaveAsync();
        logger.LogInformation($"Task with id {taskEntity.Id} added");
    }

    public async Task<OneOf<None, NotFound>> DeleteAsync(int id)
    {
        logger.LogInformation($"Start deleting task {id}");
        var task = await tasksRepository.GetByIdAsync(id);
        if (task is null)
        {
            logger.LogWarning($"Task with id {id} not found");
            return new NotFound();
        }

        tasksRepository.DeleteAsync(task);
        await tasksRepository.SaveAsync();
        logger.LogInformation($"Task with id {id} successfully deleted");
        return new None();
    }

    public async Task<IEnumerable<FullTask>> GetAllAsync()
    {
        var tasks = await tasksRepository.GetAllAsync();
        var taskModels = mapper.Map<IEnumerable<FullTask>>(tasks);
        logger.LogInformation("Successfully returned all tasks");
        return taskModels;
    }

    public async Task<OneOf<FullTask, NotFound>> GetByIdAsync(int id)
    {
        var taskEntity = await tasksRepository.GetByIdAsync(id);
        if (taskEntity is null)
        {
            logger.LogWarning($"Task with id {id} not found");
            return new NotFound();
        }

        var taskModel = mapper.Map<FullTask>(taskEntity);
        logger.LogInformation($"Successfully returned task with id {id}");
        return taskModel;
    }

    public async Task<OneOf<None, NotFound>> UpdateAsync(FullTask taskModel)
    {
        logger.LogInformation($"Started updating task {taskModel.Id}");
        var taskCheck = await tasksRepository.GetByIdAsync(taskModel.Id);
        if (taskCheck is null)
        {
            logger.LogWarning($"Task with id {taskModel.Id} not found");
            return new NotFound();
        }
        var task = mapper.Map<TodoTask>(taskModel);
        tasksRepository.UpdateAsync(task);
        await tasksRepository.SaveAsync();
        logger.LogInformation($"Task with id {task.Id} successfully deleted");
        return new None();
    }
}
