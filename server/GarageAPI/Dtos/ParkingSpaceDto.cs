using GarageAPI.Enums;
using System;

namespace GarageAPI.Dtos
{
    public class ParkingSpaceDto
    {
        public Guid Id { get; set; }
        public int ParkingSlot { get; set; }
        public VehicalType VehicalType { get; set; }
        public bool IsUsed { get; set; }
    }
}