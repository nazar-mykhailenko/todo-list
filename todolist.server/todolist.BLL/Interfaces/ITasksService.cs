using Todolist.BLL.Models;

namespace Todolist.BLL.Interfaces;

public interface ITasksService
{
    Task<IEnumerable<ShortTask>> GetAll();

    Task<FullTask> GetById(int id);

    Task Create(FullTask taskModel);

    Task Update(FullTask taskModel);

    Task Delete(int id);
}
