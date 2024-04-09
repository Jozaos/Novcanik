using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly WalletContext _context;

        public AccountController(WalletContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Account.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
            return new JsonResult(_context.Account.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Account account)
        {
            _context.Account.Add(account);
            _context.SaveChanges();
            return new JsonResult(account);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Account account)
        {
            var IdIzbaze = _context.Account.Find(id);
            IdIzbaze.username = account.username;
            IdIzbaze.owner_name = account.owner_name;
            IdIzbaze.surname = account.surname;
            IdIzbaze.id_num = account.id_num;
            IdIzbaze.balance = account.balance;

            _context.Account.Update(IdIzbaze);
            _context.SaveChanges();
            return new JsonResult(account);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var IdIzBaze = _context.Account.Find(id);
            _context.Account.Remove(IdIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }
    }
}
