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

        protected override void DeleteControl(Account entitet)
        {
         
        }


    }
}
