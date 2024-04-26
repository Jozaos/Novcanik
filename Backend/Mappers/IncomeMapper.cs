using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class IncomeMapping : Mapping<Income, IncomeDTORead, IncomeDTOInsertUpdate>
    {

        public IncomeMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Income, IncomeDTORead>()
                .ConstructUsing(entitet =>
                 new IncomeDTORead(
                    entitet.Id,
                    entitet.income_type,
                    entitet.account.Id,
                    entitet.income_value


                    )); ;
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<IncomeDTOInsertUpdate, Income>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Income, IncomeDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new IncomeDTOInsertUpdate(


                    entitet.income_type,
                    entitet.Id,
                    entitet.income_value

                     ));
            })); ; ;
        }
    }
}
