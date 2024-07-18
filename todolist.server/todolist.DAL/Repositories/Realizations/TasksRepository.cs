using Microsoft.EntityFrameworkCore;
using Todolist.DAL.Data;
using Todolist.DAL.Entities;
using Todolist.DAL.Repositories.Interfaces;

namespace Todolist.DAL.Repositories.Realizations;

public class TasksRepository : ITasksRepository
{
    private readonly AppDbContext context;

    public TasksRepository(AppDbContext context)
    {
        this.context = context;
    }

    public void Create(TodoTask task)
    {
        context.Add(task);
    }

    public void Delete(TodoTask task)
    {
        context.Remove(task);
    }

    public async Task<IEnumerable<TodoTask>> GetAll()
    {
        return await context.Tasks.ToListAsync();
    }

    public async Task<TodoTask> GetById(int id)
    {
        return await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task Save()
    {
        await context.SaveChangesAsync();
    }

    public void Update(TodoTask task)
    {
        context.Update(task);
    }
}
