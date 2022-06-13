using GarageAPI.Dtos;
using System;
using System.Threading.Tasks;

namespace GarageAPI.Services
{
    public interface IParkingService
    {
        Task<ParkingLogDto> Park(CreateParkingLogDto data);

        Task<ParkingLogDto> Leave(Guid cardId);
    }
}
