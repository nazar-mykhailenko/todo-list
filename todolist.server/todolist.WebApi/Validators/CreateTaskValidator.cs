using FluentValidation;
using Todolist.BLL.Models;

namespace Todolist.WebApi.Validators;

public class CreateTaskValidator : AbstractValidator<CreateTaskModel>
{
    public CreateTaskValidator()
    {
        RuleFor(t => t.Title).NotNull().Length(3, 50);
        RuleFor(t => t.Status).NotNull().Must(
                s => s == "To Do" || s == "In Progress" || s == "Done"
                );
    }
}
