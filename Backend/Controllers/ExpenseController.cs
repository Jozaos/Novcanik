using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    /// <summary>
    /// Kontroler za rute na entitetu Expense
    /// </summary>

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExpenseController : UniversalController<Expense, ExpensesDTORead, ExpensesDTOInsertUpdate>
    {

        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="context">Kontekst baze podataka</param>
        public ExpenseController(WalletContext context) : base(context)
        {
            DbSet = _context.Expenses;
        }

        protected override void DeleteControl(Expense entitet)
        {

        }
    }
}
