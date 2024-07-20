using AutoMapper;
using Todolist.BLL.Models;
using Todolist.DAL.Entities;

namespace Todolist.BLL.Mappings;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<TodoTask, FullTask>().ReverseMap();

        CreateMap<CreateTaskModel, TodoTask>();
    }
}
