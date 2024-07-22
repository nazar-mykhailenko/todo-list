using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using OneOf;
using Todolist.BLL.Interfaces;
using Todolist.BLL.Models;

namespace Todolist.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITasksService tasksService;
    private readonly IValidator<FullTask> taskValidator;
    private readonly IValidator<CreateTaskModel> createTaskValidator;

    public TasksController(
        ITasksService tasksService,
        IValidator<FullTask> validator,
        IValidator<CreateTaskModel> createTaskValidator
    )
    {
        this.tasksService = tasksService;
        this.taskValidator = validator;
        this.createTaskValidator = createTaskValidator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FullTask>>> GetAllAsync()
    {
        return Ok(await tasksService.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FullTask>> GetByIdAsync(int id)
    {
        if (id <= 0)
        {
            return BadRequest();
        }

        var result = await tasksService.GetByIdAsync(id);

        return result.Match<ActionResult<FullTask>>(
                task => Ok(task),
                notFound => NotFound()
                );

    }

    [HttpPost]
    public async Task<ActionResult<FullTask>> CreateAsync(CreateTaskModel task)
    {
        if (!createTaskValidator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        var result = await tasksService.CreateAsync(task);
        return Ok(result);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateAsync(FullTask task)
    {
        if (!taskValidator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        var result = await tasksService.UpdateAsync(task);

        return result.Match<ActionResult>(
                none => NoContent(),
                notFound => NotFound()
                );
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        if (id <= 0)
        {
            return BadRequest();
        }

        var result = await tasksService.DeleteAsync(id);
        return result.Match<ActionResult>(
                none => NoContent(),
                notFound => NotFound()
                );
    }
}
