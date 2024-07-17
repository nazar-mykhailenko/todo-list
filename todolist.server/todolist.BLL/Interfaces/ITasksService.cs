using Todolist.BLL.Models;

namespace Todolist.BLL.Interfaces;

public interface ITasksService
{
    Task<ShortTask> GetAll();

    Task<FullTask> GetById();

    Task Create(FullTask taskModel);

    Task Update(FullTask taskModel);

    Task Delete(int id);
}
