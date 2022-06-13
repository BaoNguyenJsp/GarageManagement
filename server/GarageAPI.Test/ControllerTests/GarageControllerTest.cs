using GarageAPI.Controllers;
using GarageAPI.Dtos;
using GarageAPI.Enums;
using GarageAPI.Services;
using GarageAPI.Test.MockServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace GarageAPI.Test.ControllerTests
{
    public class GarageControllerTest
    {
        private readonly GarageController _garageController;
        private readonly IGarageService _garageService;

        public GarageControllerTest()
        {
            _garageService = new MockGarageService();
            _garageController = new GarageController(_garageService);
        }

        [Fact]
        public async Task Get_DataExisting_ReturnParkingLevelDtos()
        {
            // Act
            var result = await _garageController.Get();

            // Assert
            Assert.IsAssignableFrom<IEnumerable<ParkingLevelDto>>(result);
            Assert.Equal(result.Sum(x => x.AvailableCarSpaces), result.Sum(x => x.ParkingSpaces.Count(x => x.VehicalType == VehicalType.Car)));
            Assert.Equal(result.Sum(x => x.AvailableMotorbikeSpaces), result.Sum(x => x.ParkingSpaces.Count(x => x.VehicalType == VehicalType.Motorbike)));
        }
    }
}
