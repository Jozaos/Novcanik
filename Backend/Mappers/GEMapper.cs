using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class GEMapping : Mapping<GroupExpense, GEDtoRead, GEDTOInsertUpdate>
    {

        public GEMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GroupExpense, GEDtoRead>()
                .ConstructUsing(entitet =>
                 new GEDtoRead(
                    entitet.Id,

                    entitet.account.Id,
                    entitet.expense.Id

                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GEDTOInsertUpdate, GroupExpense>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GroupExpense, GEDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new GEDTOInsertUpdate(




                    entitet.account.Id,
                    entitet.expense.Id

                     ));
            })); ; ;
        }
    }
}

