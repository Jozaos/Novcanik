using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.Data
{
    public class WalletContext : DbContext
    {
        public WalletContext(DbContextOptions<WalletContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<GroupExpense> GroupExpense { get; set; }

    }
}