using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExpenseController : UniversalController<Expense, ExpensesDTORead, ExpensesDTOInsertUpdate>
    {
        public ExpenseController(WalletContext context) : base(context)
        {
            DbSet = _context.Expenses;
        }
        protected override void DeleteControl(Expense entitet)
        {

        }
    }
}
