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

    public void CreateAsync(TodoTask task)
    {
        context.Add(task);
    }

    public void DeleteAsync(TodoTask task)
    {
        context.Remove(task);
    }

    public async Task<IEnumerable<TodoTask>> GetAllAsync()
    {
        return await context.Tasks.ToListAsync();
    }

    public async Task<TodoTask> GetByIdAsync(int id)
    {
        return await context.Tasks.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task SaveAsync()
    {
        await context.SaveChangesAsync();
    }

    public void UpdateAsync(TodoTask task)
    {
        context.Update(task);
    }
}
