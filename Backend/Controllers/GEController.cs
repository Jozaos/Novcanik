using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class GEController : ControllerBase
    {
        private readonly WalletContext _context;

        public GEController(WalletContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Group_Expense.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
            return new JsonResult(_context.Group_Expense.Find(id));
        }

        [HttpPost]
        public IActionResult Post(GroupExpense groupExpense)
        {
            _context.Group_Expense.Add(groupExpense);
            _context.SaveChanges();
            return new JsonResult(groupExpense);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, GroupExpense groupExpense)
        {
            var IdIzbaze = _context.Group_Expense.Find(id);
            IdIzbaze.account = groupExpense.account;
            IdIzbaze.expense = groupExpense.expense;

            _context.Group_Expense.Update(IdIzbaze);
            _context.SaveChanges();
            return new JsonResult(groupExpense);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var IdIzBaze = _context.Group_Expense.Find(id);
            _context.Group_Expense.Remove(IdIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }
    }
}
