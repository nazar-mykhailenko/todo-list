using Todolist.DAL.Entities;

namespace Todolist.DAL.Repositories.Interfaces;

public interface ITasksRepository
{
    Task<TodoTask> GetByIdAsync(int id);

    Task<IEnumerable<TodoTask>> GetAllAsync();

    void CreateAsync(TodoTask task);

    void UpdateAsync(TodoTask task);

    void DeleteAsync(TodoTask task);

    Task SaveAsync();
}
