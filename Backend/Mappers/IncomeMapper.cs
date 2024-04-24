using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class IncomeMapping : Mapping<Income, IncomeDTORead, IncomeDtoInsertUpdate>
    {

        public IncomeMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Income, IncomeDTORead>()
                .ConstructUsing(entitet =>
                 new IncomeDTORead(
                    entitet.Id,
                    entitet.income_type,
                    entitet.income_value

                    )); ;
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<IncomeDtoInsertUpdate, Income>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Income, IncomeDtoInsertUpdate>()
                .ConstructUsing(entitet =>
                 new IncomeDtoInsertUpdate(


                    entitet.account.Id,
                    entitet.expense.Id

                     ));
            })); ; ;
        }
    }
}

