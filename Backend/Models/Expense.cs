namespace Backend.Models
{
    public class Expense: Account
    {
        public DateTime Expense_date { get; set; }
        public decimal? Expense_sum { get; set; }
        public decimal? Expense_shared { get; set; }
    }
}
