using Core;
using GarageAPI.Enums;
using System.Collections.Generic;

namespace GarageAPI.Models
{
    public class ParkingLevel : BaseEntity
    {
        public string Code { get; set; }
        public ICollection<ParkingSpace> ParkingSpaces { get; set; } = new HashSet<ParkingSpace>();
        public int AvailableCarSpaces { get; set; }
        public int AvailableMotorbikeSpaces { get; set; }
    }
}