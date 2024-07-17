using Todolist.DAL.Entities;

namespace Todolist.DAL.Repositories.Interfaces;

public interface ITasksRepository
{
    Task<TodoTask> GetById(int id);

	Task<IEnumerable<TodoTask>> GetAll();

	void Create(TodoTask task);

	void Update(TodoTask task);

	void Delete(TodoTask task);

	Task Save();
}
