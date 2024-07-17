using FluentValidation;
using Todolist.DAL.Entities;

namespace Todolist.WebApi.Validators;

public  class TaskValidator : AbstractValidator<TodoTask>
{
    public TaskValidator()
    {
        RuleFor(t => t.Id).NotNull().GreaterThan(0);
        RuleFor(t => t.Title).NotNull().Length(3, 50);
        RuleFor(t => t.Status).NotNull().Must(
                s => s == "Todo" || s == "In Progress" || s == "Done"
                );

    }
}
