using GarageAPI.Dtos;
using GarageAPI.Enums;
using GarageAPI.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageAPI.Test.MockServices
{
    public class MockGarageService : IGarageService
    {
        public async Task<IEnumerable<ParkingLevelDto>> Get()
        {
            return new List<ParkingLevelDto>
            {
                new ParkingLevelDto
                {
                    Id = Guid.NewGuid(),
                    Code = "A1",
                    AvailableCarSpaces = 1,
                    AvailableMotorbikeSpaces = 2,
                    ParkingSpaces = new List<ParkingSpaceDto>
                    {
                        new ParkingSpaceDto
                        {
                            ParkingSlot = 1,
                            VehicalType = VehicalType.Car
                        },
                        new ParkingSpaceDto
                        {
                            ParkingSlot = 2,
                            VehicalType = VehicalType.Motorbike
                        },
                        new ParkingSpaceDto
                        {
                            ParkingSlot = 3,
                            VehicalType = VehicalType.Motorbike
                        },
                    }
                }
            };
        }

        public async Task<ParkingLevelDto> Create(CreateParkingLevelDto data)
        {
            throw new NotImplementedException();
        }

        public async Task<ParkingLevelDto> Update(Guid id, UpdateParkingLevelDto data)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
