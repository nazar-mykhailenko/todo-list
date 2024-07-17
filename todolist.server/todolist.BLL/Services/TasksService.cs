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

    public TasksService(IMapper mapper, ILogger<TasksService> logger, ITasksRepository tasksRepository)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.tasksRepository = tasksRepository;
    }

    public async Task Create(FullTask taskModel)
    {
        logger.LogInformation("Start adding task");
        var taskEntity = mapper.Map<TodoTask>(taskModel);
        tasksRepository.Create(taskEntity);
        await tasksRepository.Save();
        logger.LogInformation($"Task with id {taskEntity.Id} added");
    }

    public async Task Delete(int id)
    {
        logger.LogInformation($"Start deleting task {id}");
        var task = await tasksRepository.GetById(id);

        tasksRepository.Delete(task);
        await tasksRepository.Save();
        logger.LogInformation($"Task with id {id} successfully deleted");
    }

    public async Task<IEnumerable<ShortTask>> GetAll()
    {
        var tasks = await tasksRepository.GetAll();
        var taskModels = mapper.Map<IEnumerable<ShortTask>>(tasks);
        logger.LogInformation("Successfully returned all tasks");
        return taskModels;
    }

    public async Task<FullTask> GetById(int id)
    {
        var taskEntity = await tasksRepository.GetById(id);
        if (taskEntity is null)
        {
            logger.LogWarning($"Task with id {id} not found");
            throw new NotFoundException();
        }

        var taskModel = mapper.Map<FullTask>(taskEntity);
        logger.LogInformation($"Successfully returned task with id {id}");
        return taskModel;
    }

    public async Task Update(FullTask taskModel)
    {
        logger.LogInformation($"Started updating task {taskModel.Id}");
        await tasksRepository.GetById(taskModel.Id);
        var task = mapper.Map<TodoTask>(taskModel);
        tasksRepository.Update(task);
        await tasksRepository.Save();
        logger.LogInformation($"Task with id {task.Id} successfully deleted");
    }
}
