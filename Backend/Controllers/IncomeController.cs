using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class IncomeController : ControllerBase
    {
        private readonly WalletContext _context;

        public IncomeController(WalletContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Incomes.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
            return new JsonResult(_context.Incomes.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Income income)
        {
            _context.Incomes.Add(income);
            _context.SaveChanges();
            return new JsonResult(income);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Income income)
        {
            var IdIzbaze = _context.Incomes.Find(id);
            IdIzbaze.income_type = income.income_type;
            IdIzbaze.account = income.account;

            _context.Incomes.Update(IdIzbaze);
            _context.SaveChanges();
            return new JsonResult(income);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var IdIzBaze = _context.Incomes.Find(id);
            _context.Incomes.Remove(IdIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }
    }
}
