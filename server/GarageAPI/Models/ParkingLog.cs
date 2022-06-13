using Core;
using GarageAPI.Enums;
using System;

namespace GarageAPI.Models
{
    public class ParkingLog : BaseEntity
    {
        public Guid CardId { get; set; }
        public Guid ParkingLevelId { get; set; }
        public Guid ParkingSpaceId { get; set; }
        public int ParkingSlot { get; set; }
        public string LicensePlate { get; set; }
        public VehicalType VehicalType { get; set; }
        public long ParkTime { get; set; }
        public long? LeaveTime { get; set; }
    }
}
