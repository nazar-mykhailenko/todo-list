using AutoMapper;
using Microsoft.Extensions.Logging;
using Todolist.BLL.Exceptions;
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

    public async Task DeleteAsync(int id)
    {
        logger.LogInformation($"Start deleting task {id}");
        var task = await tasksRepository.GetByIdAsync(id);

        tasksRepository.DeleteAsync(task);
        await tasksRepository.SaveAsync();
        logger.LogInformation($"Task with id {id} successfully deleted");
    }

    public async Task<IEnumerable<ShortTask>> GetAllAsync()
    {
        var tasks = await tasksRepository.GetAllAsync();
        var taskModels = mapper.Map<IEnumerable<ShortTask>>(tasks);
        logger.LogInformation("Successfully returned all tasks");
        return taskModels;
    }

    public async Task<FullTask> GetByIdAsync(int id)
    {
        var taskEntity = await tasksRepository.GetByIdAsync(id);
        if (taskEntity is null)
        {
            logger.LogWarning($"Task with id {id} not found");
            throw new NotFoundException();
        }

        var taskModel = mapper.Map<FullTask>(taskEntity);
        logger.LogInformation($"Successfully returned task with id {id}");
        return taskModel;
    }

    public async Task UpdateAsync(FullTask taskModel)
    {
        logger.LogInformation($"Started updating task {taskModel.Id}");
        await tasksRepository.GetByIdAsync(taskModel.Id);
        var task = mapper.Map<TodoTask>(taskModel);
        tasksRepository.UpdateAsync(task);
        await tasksRepository.SaveAsync();
        logger.LogInformation($"Task with id {task.Id} successfully deleted");
    }
}
