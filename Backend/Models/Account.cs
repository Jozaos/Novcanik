using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public abstract class Account
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public ICollection<GroupExpense> GroupExpenses { get; } = [];


    }
}
