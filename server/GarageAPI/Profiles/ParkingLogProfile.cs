using AutoMapper;
using GarageAPI.Dtos;
using GarageAPI.Models;

namespace GarageAPI.Profiles
{
    public class ParkingLogProfile : Profile
    {
        public ParkingLogProfile()
        {
            EntitiesToDtos();
            DtosToEntities();
        }

        private void EntitiesToDtos()
        {
            CreateMap<ParkingLog, ParkingLogDto>();
        }

        private void DtosToEntities()
        {
            CreateMap<CreateParkingLogDto, ParkingLog>();
        }
    }
}
