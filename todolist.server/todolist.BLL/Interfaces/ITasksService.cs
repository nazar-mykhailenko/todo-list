using OneOf;
using OneOf.Types;
using Todolist.BLL.Models;

namespace Todolist.BLL.Interfaces;

public interface ITasksService
{
    Task<IEnumerable<ShortTask>> GetAllAsync();

    Task<FullTask> GetByIdAsync(int id);

    Task CreateAsync(CreateTaskModel taskModel);

    Task<OneOf<None, NotFound>> UpdateAsync(FullTask taskModel);

    Task<OneOf<None, NotFound>> DeleteAsync(int id);
}
