using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GEController : UniversalController<GE, GEDTORead, GEDtoInsertUpdate>
    {
        public GEController(WalletContext context) : base(context)
        {
            DbSet = _context.Ulovi;
            _mapper = new GEMapping();


        }
        protected override void DeleteControl(GE entitet)
        {

        }

        protected override List<GEDTORead> UcitajSve()
        {
            var lista = _context.Ulovi
                    .Include(g => g.Riba)
                    .Include(g => g.Unos)


                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override GE KreirajEntitet(GEDtoInsertUpdate dto)
        {
            var Unos = _context.Unosi.FirstOrDefault(k => k.id == dto.GEUnos);
            if (Unos == null)
            {
                throw new Exception("Ne postoji Unos s  id  " + dto.GEUnos + " u bazi");
            }
            var Riba = _context.Ribe.FirstOrDefault(k => k.id == dto.VrstaId);
            if (Riba == null)
            {
                throw new Exception("Ne postoji Riba s  id  " + dto.VrstaId + " u bazi");
            }

            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Riba = Riba;
            entitet.Unos = Unos;

            entitet.Tezina = dto.Tezina;
            entitet.Duzina = dto.Duzina;
            entitet.Kolicina = dto.Kolicina;
            entitet.Fotografija = dto.Fotografija;

            return entitet;
        }



        protected override GE NadiEntitet(int id)
        {
            return _context.Ulovi
                           .Include(ulov => ulov.Unos)
                           .Include(ulov => ulov.Riba)
                           .FirstOrDefault(ulov => ulov.id == id)
                   ?? throw new Exception("Ne postoji Ulov s šifrom " + id + " u bazi");
        }


        protected override GE PromjeniEntitet(GEDtoInsertUpdate dto, GE entitet)
        {
            var Unos = _context.Unosi.Find(dto.GEUnos) ?? throw new Exception("Ne postoji Unos s šifrom " + dto.GEUnos + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje
            var Riba = _context.Ribe.Find(dto.VrstaId) ?? throw new Exception("Ne postoji Riba s šifrom " + dto.VrstaId + " u bazi");

            entitet.Riba = Riba;
            entitet.Unos = Unos;
            entitet.Tezina = dto.Tezina;
            entitet.Duzina = dto.Duzina;
            entitet.Kolicina = dto.Kolicina;
            entitet.Fotografija = dto.Fotografija;

            return entitet;
        }
    }



}