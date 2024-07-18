using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Todolist.BLL.Exceptions;
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

    public TasksController(ITasksService tasksService, IValidator<FullTask> validator, IValidator<CreateTaskModel> createTaskValidator)
    {
        this.tasksService = tasksService;
        this.taskValidator = validator;
        this.createTaskValidator = createTaskValidator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShortTask>>> GetAllAsync()
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

        return await Catch(async () =>
        {
            var task = await tasksService.GetByIdAsync(id);

            return Ok(task);
        });
    }

    [HttpPost]
    public async Task<ActionResult> CreateAsync(CreateTaskModel task)
    {
        if (!createTaskValidator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        await tasksService.CreateAsync(task);
        return NoContent();
    }

    [HttpPut]
    public async Task<ActionResult> UpdateAsync(FullTask task)
    {
        if (!taskValidator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        return await Catch(async () =>
        {
            await tasksService.UpdateAsync(task);
            return NoContent();
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        if (id <= 0)
        {
            return BadRequest();
        }

        return await Catch(async () =>
        {
            await tasksService.DeleteAsync(id);
            return NoContent();
        });
    }

    private async Task<ActionResult> Catch(Func<Task<ActionResult>> func)
    {
        try
        {
            return await func.Invoke();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (System.Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
