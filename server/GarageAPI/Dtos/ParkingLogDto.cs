using GarageAPI.Enums;
using System;

namespace GarageAPI.Dtos
{
    public class ParkingLogDto
    {
        public Guid ParkingLevelId { get; set; }
        public Guid ParkingSpaceId { get; set; }
        public string LicensePlate { get; set; }
        public VehicalType VehicalType { get; set; }
        public long ParkTime { get; set; }
        public long? LeaveTime { get; set; }
    }
}
