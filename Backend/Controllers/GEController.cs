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
    public class GEController : UniversalController<GroupExpense, GEDtoRead, GEDTOInsertUpdate>
    {
        public GEController(WalletContext context) : base(context)
        {
            DbSet = _context.Group_Expenses;
            _mapper = new GEMapping();


        }
        protected override void DeleteControl(GroupExpense entitet)
        {

        }

        protected override List<GEDtoRead> UcitajSve()
        {
            var lista = _context.Group_Expenses
                    .Include(g => g.account)
                    .Include(g => g.expense)


                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override GroupExpense KreirajEntitet(GEDTOInsertUpdate dto)
        {
            var account = _context.Accounts.FirstOrDefault(k => k.Id == dto.accountidd);
            if (account == null)
            {
                throw new Exception("Ne postoji account s  id  " + dto.accountidd + " u bazi");
            }
            var expense = _context.Expenses.FirstOrDefault(k => k.Id == dto.expenseid);
            if (expense == null)
            {
                throw new Exception("Ne postoji expense s  id  " + dto.expenseid + " u bazi");
            }

            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.account = account;
            entitet.expense = expense;



            return entitet;
        }



        protected override GroupExpense NadiEntitet(int id)
        {
            return _context.Group_Expenses
                           .Include(GroupExpense => GroupExpense.expense)
                           .Include(GroupExpense => GroupExpense.account)
                           .FirstOrDefault(ulov => ulov.Id == id)
                   ?? throw new Exception("Ne postoji Grpupexepnse s šifrom " + id + " u bazi");
        }


        protected override GroupExpense PromjeniEntitet(GEDTOInsertUpdate dto, GroupExpense entitet)
        {
            var account = _context.Accounts.Find(dto.accountidd) ?? throw new Exception("Ne postoji account s id " + dto.accountidd + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje
            var expense = _context.Expenses.Find(dto.expenseid) ?? throw new Exception("Ne postoji trosak s id " + dto.expenseid + " u bazi");

            entitet.account = account;
            entitet.expense = expense;


            return entitet;
        }
    }



}