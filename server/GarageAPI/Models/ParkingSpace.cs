using Core;
using GarageAPI.Enums;

namespace GarageAPI.Models
{
    public class ParkingSpace : BaseEntity
    {
        public int ParkingSlot { get; set; }
        public VehicalType VehicalType { get; set; } = VehicalType.Car;
    }
}