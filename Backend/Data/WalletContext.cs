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
    }
}
