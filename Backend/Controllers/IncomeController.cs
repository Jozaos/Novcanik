using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
<<<<<<< Updated upstream
    public class IncomeController:ControllerBase
=======
    public class IncomeController : ControllerBase
>>>>>>> Stashed changes
    {
        private readonly WalletContext _context;

        public IncomeController(WalletContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
<<<<<<< Updated upstream
            return new JsonResult(_context.Incomes.ToList());
=======
            return new JsonResult(_context.Income.ToList());
>>>>>>> Stashed changes
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
<<<<<<< Updated upstream
            return new JsonResult(_context.Incomes.Find(id));
        }

        [HttpPost]
        public IActionResult Post (Income income)
        {
            _context.Incomes.Add(income);
=======
            return new JsonResult(_context.Income.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Income income)
        {
            _context.Income.Add(income);
>>>>>>> Stashed changes
            _context.SaveChanges();
            return new JsonResult(income);
        }

        [HttpPut]
        [Route("{id:int}")]
<<<<<<< Updated upstream
        public IActionResult Put(int id, Income income
            )
        {
            var IdIzbaze = _context.Incomes.Find(id);
            IdIzbaze.income_type=income.income_type;
            IdIzbaze.account= income.account;

            _context.Incomes.Update(IdIzbaze);
=======
        public IActionResult Put(int id, Income income)
        {
            var IdIzbaze = _context.Income.Find(id);
            IdIzbaze.Income_type = income.Income_type;
            IdIzbaze.Account = income.Account;


            _context.Income.Update(IdIzbaze);
>>>>>>> Stashed changes
            _context.SaveChanges();
            return new JsonResult(income);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
<<<<<<< Updated upstream
            var IdIzBaze = _context.Incomes.Find(id);
            _context.Incomes.Remove(IdIzBaze);
=======
            var IdIzBaze = _context.Income.Find(id);
            _context.Income.Remove(IdIzBaze);
>>>>>>> Stashed changes
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }
    }
}
