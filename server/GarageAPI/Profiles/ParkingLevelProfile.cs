using AutoMapper;
using GarageAPI.Dtos;
using GarageAPI.Models;

namespace GarageAPI.Profiles
{
    public class ParkingLevelProfile : Profile
    {
        public ParkingLevelProfile()
        {
            EntitiesToDtos();
            DtosToEntities();
        }

        private void EntitiesToDtos()
        {
            CreateMap<ParkingLevel, ParkingLevelDto>();
            CreateMap<ParkingSpace, ParkingSpaceDto>();
        }

        private void DtosToEntities()
        {
            CreateMap<CreateParkingLevelDto, ParkingLevel>()
                .ForMember(dest => dest.AvailableCarSpaces, opt => opt.MapFrom(src => src.CarSpaces))
                .ForMember(dest => dest.AvailableMotorbikeSpaces, opt => opt.MapFrom(src => src.MotorbikeSpaces));
            CreateMap<UpdateParkingLevelDto, ParkingLevel>()
                .ForMember(dest => dest.AvailableCarSpaces, opt => opt.MapFrom(src => src.CarSpaces))
                .ForMember(dest => dest.AvailableMotorbikeSpaces, opt => opt.MapFrom(src => src.MotorbikeSpaces));
            CreateMap<ParkingSpaceDto, ParkingSpace>();
        }
    }
}
