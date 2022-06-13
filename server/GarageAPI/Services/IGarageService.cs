using GarageAPI.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageAPI.Services
{
    public interface IGarageService
    {
        Task<IEnumerable<ParkingLevelDto>> Get();
        Task<ParkingLevelDto> Create(CreateParkingLevelDto data);
        Task<ParkingLevelDto> Update(Guid id, UpdateParkingLevelDto data);
        Task<bool> Delete(Guid id);
    }
}
