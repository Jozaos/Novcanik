using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    /// <summary>
    /// Apstraktna klasa koja objedinjuje zajedničke rute CRUD operacija
    /// </summary>
    /// <typeparam name="T">Tip entiteta</typeparam>
    /// <typeparam name="TDR">DTO read</typeparam>
    /// <typeparam name="TDI">DTO insert i update</typeparam>
    /// <param name="context">Kontekst baze podataka</param>
    public abstract class UniversalController<T, TDR, TDI>(WalletContext context) : ControllerBase where T : Entitet
    {

        /// <summary>
        /// Trenutni DBset
        /// </summary>
        protected DbSet<T>? DbSet = null;

        /// <summary>
        /// Mapper koji koristim
        /// </summary>
        protected Mapping<T, TDR, TDI> _mapper = new();

        /// <summary>
        /// Svaka potklasa mora implementirati metodu a ako nema uvjeta brisanja ostavlja ju praznu
        /// </summary>
        /// <param name="entitet"></param>
        protected abstract void DeleteControl(T entitet);

        /// <summary>
        /// Kontekst baze podataka (DI)
        /// </summary>
        protected readonly WalletContext _context = context;

        /// <summary>
        /// Dohvaćanje svih entiteta iz baze prema DTO read
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                return new JsonResult(UcitajSve());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Dohvaćanje jednog entiteta iz baze prema DTO read
        /// </summary>
        /// <param name="id">Primarni ključ u bazi</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBySifra(int id)
        {
            if (!ModelState.IsValid || id <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = NadiEntitet(id);
                return new JsonResult(_mapper.MapInsertUpdateToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Dodavanje novog entiteta u bazu
        /// </summary>
        /// <param name="entitetDTO">DTO insert i update</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(TDI entitetDTO)
        {
            if (!ModelState.IsValid || entitetDTO == null)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var entitet = KreirajEntitet(entitetDTO);
                _context.Add(entitet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created,
                                       _mapper.MapReadToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Promjena entiteta u bazi
        /// </summary>
        /// <param name="id">Primarni ključ</param>
        /// <param name="dto">DTO insert i update</param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, TDI dto)
        {
            if (id <= 0 || !ModelState.IsValid || dto == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var entitetIzBaze = NadiEntitet(id);
                _context.Entry(entitetIzBaze).State = EntityState.Detached;
                var entitet = PromjeniEntitet(dto, entitetIzBaze);
                entitet.Id = id;
                _context.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, _mapper.MapInsertUpdateToDTO(entitet));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Brisanej entiteta iz baze (ako je kontrola brisanja prošla)
        /// </summary>
        /// <param name="id">Primarni ključ</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid || id <= 0)
            {
                return BadRequest();
            }
            try
            {
                var entitetIzbaze = NadiEntitet(id);
                DeleteControl(entitetIzbaze);
                _context.Remove(entitetIzbaze);
                _context.SaveChanges();
                return Ok("Obrisano");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        protected virtual T NadiEntitet(int id)
        {
            var entitetIzbaze = DbSet?.Find(id);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji entitet s id " + id + " u bazi");
            }

            return entitetIzbaze;
        }

        protected virtual List<TDR> UcitajSve()
        {
            var lista = DbSet?.ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected virtual T KreirajEntitet(TDI dto)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }

        protected virtual T PromjeniEntitet(TDI dto, T s)
        {
            return _mapper.MapInsertUpdatedFromDTO(dto);
        }

    }
}