using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class WalletContext:DbContext
    {
        public WalletContext(DbContextOptions<WalletContext> options) : base(options)
        {

        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<GroupExpense> GroupExpenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasMany(g => g.GroupExpenses);
            modelBuilder.Entity<GroupExpense>().HasOne(g => g.accounts);



        }
    }
}
