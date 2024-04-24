using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : UniversalController<Account, AccountsDTORead, AccountsDTOInsertUpdate>
    {
        public AccountController(WalletContext context) :base(context)
        {
            DbSet = _context.Accounts;
        }
        protected override void DeleteControl(Account entitet)
        {
         
        }


    }
}
