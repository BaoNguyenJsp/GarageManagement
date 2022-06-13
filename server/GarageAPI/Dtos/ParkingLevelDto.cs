using GarageAPI.Enums;
using System;
using System.Collections.Generic;

namespace GarageAPI.Dtos
{
    public class ParkingLevelDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public ICollection<ParkingSpaceDto> ParkingSpaces { get; set; }
        public int AvailableCarSpaces { get; set; }
        public int AvailableMotorbikeSpaces { get; set; }
    }
}
