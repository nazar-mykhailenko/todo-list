using Microsoft.EntityFrameworkCore;
using Todolist.DAL.Entities;

namespace Todolist.DAL.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options)
        : base(options) { }

	public DbSet<TodoTask> Tasks { get; set; }
}
