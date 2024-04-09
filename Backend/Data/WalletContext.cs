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
<<<<<<< Updated upstream
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<GroupExpense> GroupExpenses { get; set; }
=======
        public DbSet<Account> Account { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<GroupExpense> GroupExpense { get; set;}

>>>>>>> Stashed changes

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasMany(g => g.GroupExpenses);
            modelBuilder.Entity<GroupExpense>().HasOne(g => g.accounts);



        }
    }
}
