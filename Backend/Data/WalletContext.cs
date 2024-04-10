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
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<GroupExpense> Group_Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupExpense>().HasOne(u => u.account);
            modelBuilder.Entity<GroupExpense>().HasOne(u => u.expense);

            modelBuilder.Entity<Income>().HasOne(u => u.account);
        }

    }
}