using Todolist.BLL.Models;

namespace Todolist.BLL.Interfaces;

public interface ITasksService
{
    Task<IEnumerable<ShortTask>> GetAllAsync();

    Task<FullTask> GetByIdAsync(int id);

    Task CreateAsync(CreateTaskModel taskModel);

    Task UpdateAsync(FullTask taskModel);

    Task DeleteAsync(int id);
}
