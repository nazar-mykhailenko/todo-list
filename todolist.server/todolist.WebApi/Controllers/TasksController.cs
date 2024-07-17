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
    private readonly IValidator<FullTask> validator;

    public TasksController(ITasksService tasksService, IValidator<FullTask> validator)
    {
        this.tasksService = tasksService;
        this.validator = validator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShortTask>>> GetAll()
    {
        return Ok(await tasksService.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FullTask>> GetById(int id)
    {
        if (id <= 0)
        {
            return BadRequest();
        }

        return await Catch(async () =>
        {
            var task = await tasksService.GetById(id);

            return Ok(task);
        });
    }

    [HttpPost]
    public async Task<ActionResult> Create(FullTask task)
    {
        if (!validator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        await tasksService.Create(task);
        return NoContent();
    }

    [HttpPut]
    public async Task<ActionResult> Update(FullTask task)
    {
        if (!validator.Validate(task).IsValid)
        {
            return BadRequest();
        }

        return await Catch(async () =>
        {
            await tasksService.Update(task);
            return NoContent();
        });
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(int id)
    {
        if (id <= 0)
        {
            return BadRequest();
        }

        return await Catch(async () =>
        {
            await tasksService.Delete(id);
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
