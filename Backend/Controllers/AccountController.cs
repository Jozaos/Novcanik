using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za rute na entitetu Account
    /// </summary>

    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : UniversalController<Account, AccountsDTORead, AccountsDTOInsertUpdate>
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="context">Kontekst baze podataka</param>
        public AccountController(WalletContext context) :base(context)
        {
            DbSet = _context.Accounts;
        }
        [HttpGet]
        [Route("traziStranicenje/{stranica}")]
        public IActionResult TraziPolaznikStranicenje(int stranica, string uvjet = "")
        {
            var poStranici = 8;
            uvjet = uvjet.ToLower();
            try
            {
                var accounts = _context.Accounts
                    .Where(p => EF.Functions.Like(p.username.ToLower(), "%" + uvjet + "%")
                                || EF.Functions.Like(p.owner_name.ToLower(), "%" + uvjet + "%"))
                    .Skip((poStranici * stranica) - poStranici)
                    .Take(poStranici)
                    .OrderBy(p => p.username)
                    .ToList();


                return new JsonResult(_mapper.MapReadList(accounts));

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        protected override void DeleteControl(Account entitet)
        {
         
        }


    }
}
