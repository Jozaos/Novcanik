using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExpenseController : WalletController<Expense, ExpenseDTORead, ExpenseDTOInsertUpdate>
    {
        public ExpenseController(WalletContext context) : base(context)
        {
            DbSet = _context.Expenses;
        }

        protected override void ControlDelete(Expense entity)
        {
            throw new NotImplementedException();
        }

        //protected override void KontrolaBrisanje(Expense entitet)
        //{
        //    var lista = _context.Expenses
        //        .Include(x => x.Username)
        //        .Where(x => x.GroupExpenses.== entitet.Id)
        //        .ToList();
        //    if (lista != null && lista.Count > 0)
        //    {
               
        //        throw new Exception(); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
        //    }
        

    }
}