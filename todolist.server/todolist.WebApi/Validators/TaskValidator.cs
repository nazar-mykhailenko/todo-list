using FluentValidation;
using Todolist.BLL.Models;

namespace Todolist.WebApi.Validators;

public  class TaskValidator : AbstractValidator<FullTask>
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
