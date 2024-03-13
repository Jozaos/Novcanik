using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExpenseController
    {
        private readonly WalletContext _context;

        public ExpenseController(WalletContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Expenses.ToList());
        }

        [HttpPost]
        public IActionResult Post (Expense expense)
        {
            _context.Expenses.Add(expense);
            _context.SaveChanges();
            return new JsonResult(expense);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Expense expense)
        {
            var IdIzbaze = _context.Expenses.Find(id);
            IdIzbaze.Expense_sum=expense.Expense_sum;
            IdIzbaze.Expense_date=expense.Expense_date;
            IdIzbaze.Expense_shared=expense.Expense_shared;

            _context.Expenses.Update(IdIzbaze);
            _context.SaveChanges();
            return new JsonResult(expense);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var IdIzBaze = _context.Expenses.Find(id);
            _context.Expenses.Remove(IdIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }
    }
}
