using AutoMapper;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class GEMapping : Mapping<GE, GEDTORead, GEDtoInsertUpdate>
    {

        public GEMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GE, GEDTORead>()
                .ConstructUsing(entitet =>
                 new GEDTORead(
                    entitet.id,

                    entitet.Riba.Vrsta,
                    entitet.Unos.id,
                    entitet.Tezina,
                    entitet.Kolicina,
                    entitet.Duzina,
                    entitet.Fotografija
                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GEDtoInsertUpdate, GE>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<GE, GEDtoInsertUpdate>()
                .ConstructUsing(entitet =>
                 new GEDtoInsertUpdate(


                    entitet.Riba.id,
                    entitet.Unos.id,
                    entitet.Tezina,
                    entitet.Kolicina,
                    entitet.Duzina,
                    entitet.Fotografija));
            })); ; ;
        }
    }
}





