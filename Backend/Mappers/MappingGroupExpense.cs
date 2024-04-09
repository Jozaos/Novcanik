using AutoMapper;
using Backend.Mappers;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mappers
{
    public class MappingGrupa : Mapping<Expense, ExpenseDTORead, ExpenseDTOInsertUpdate>
    {

        public MappingGrupa()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Expense, ExpenseDTORead>()
                .ConstructUsing(entitet =>
                 new ExpenseDTORead(
                    entitet.Id,
                    entitet.Expense_date,
                    entitet.Expense_sum,
                    entitet.Expense_shared));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<ExpenseDTOInsertUpdate, Expense>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Expense, ExpenseDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new ExpenseDTOInsertUpdate(

                    entitet.Expense_date,
                    entitet.Expense_sum,
                    entitet.Expense_shared

            )) ;
            }));
        }



    }
}