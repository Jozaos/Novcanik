using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za rute na entitetu Income
    /// </summary>

    [ApiController]
    [Route("api/v1/[controller]")]
    public class IncomeController : UniversalController<Income, IncomeDTORead, IncomeDTOInsertUpdate>
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="context">Kontekst baze podataka</param>
        public IncomeController(WalletContext context) : base(context)
        {
            DbSet = _context.Incomes;
            _mapper = new IncomeMapping();


        }
        /// <summary>
        /// Svaka potklasa mora implementirati metodu a ako nema uvjeta brisanja ostavlja ju praznu
        /// </summary>
        /// <param name="entitet"></param>
        protected override void DeleteControl(Income entitet)
        {
            
        }

      
        protected override List<IncomeDTORead> UcitajSve()
        {
            var lista = _context.Incomes
                    .Include(g => g.account)

                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Income KreirajEntitet(IncomeDTOInsertUpdate dto)
        {
            var Account = _context.Accounts.FirstOrDefault(k => k.Id == dto.accountid);
            if (Account == null)
            {
                throw new Exception("Ne postoji income s  " + dto.accountid + " u bazi");
            }



            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.account = Account;
            entitet.income_type = dto.income_type;

            return entitet;
        }



        protected override Income NadiEntitet(int id)
        {

            return _context.Incomes
                           .Include(i => i.account)
                           .FirstOrDefault(x => x.Id == id)
                   ?? throw new Exception("Ne postoji Income s šifrom " + id + " u bazi");
        }


    }
}