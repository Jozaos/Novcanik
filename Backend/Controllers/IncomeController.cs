using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class IncomeController : UniversalController<Income, IncomeDTORead, IncomeDtoInsertUpdate>
    {
        public IncomeController(WalletContext context) : base(context)
        {
            DbSet = _context.Incomes;
            _mapper = new IncomeMapping();


        }
        protected override void DeleteControl(Income entitet)
        {
            var lista = _context.Incomes
                .Where(x => x.id == entitet.id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Can't be deleted, income is inserted.");
                foreach (var e in lista)
                {
                    sb.Append(e).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

        [HttpGet("IncomePoKorisniku/{accountid:int}")]
        public IActionResult GetIncomeiByaccountid(int accountid)
        {
            if (accountid <= 0)
            {
                return BadRequest();
            }

            try
            {
                var unosiList = _context.Incomes
                    .Where(u => u.accountid)
                    .Include(u => u.accountid)
                    .ToList();

                if (unosiList == null || unosiList.Count == 0)
                {
                    return NotFound($"Nema unosa za korisnika imePrezime {accountid}");
                }

                var mapping = new Mapping<Income, IncomeDtoRead, IncomeDTOInsertUpdate>();
                var unosiDtoList = unosiList.Select(u => mapping.MapReadToDTO(u)).ToList();

                return new JsonResult(unosiDtoList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected override List<IncomeDtoRead> UcitajSve()
        {
            var lista = _context.Incomes
                    .Include(g => g.Korisnik)

                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Income KreirajEntitet(IncomeDTOInsertUpdate dto)
        {
            var Korisnik = _context.Korisnici.FirstOrDefault(k => k.id == dto.accountid);
            if (Korisnik == null)
            {
                throw new Exception("Ne postoji korisnik s imenom i prezimenom " + dto.accountid + " u bazi");
            }



            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Korisnik = Korisnik;
            entitet.Datum = dto.Datum;
            entitet.Vodostaj = dto.Vodostaj;
            entitet.Biljeska = dto.Biljeska;

            return entitet;
        }



        protected override Income NadiEntitet(int id)
        {

            return _context.Incomes
                           .Include(i => i.Korisnik)
                           .FirstOrDefault(x => x.id == id)
                   ?? throw new Exception("Ne postoji Income s šifrom " + id + " u bazi");
        }

        protected override Income PromjeniEntitet(IncomeDTOInsertUpdate dto, Income entitet)
        {
            var Korisnik = _context.Korisnici.Find(dto.accountid) ?? throw new Exception("Ne postoji Korisnik s šifrom " + dto.accountid + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje

            entitet.Korisnik = Korisnik;
            entitet.Datum = dto.Datum;
            entitet.Vodostaj = dto.Vodostaj;
            entitet.Biljeska = dto.Biljeska;

            return entitet;
        }
    }
}
