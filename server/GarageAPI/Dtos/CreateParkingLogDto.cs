using GarageAPI.Enums;
using System;

namespace GarageAPI.Dtos
{
    public class CreateParkingLogDto
    {
        public Guid CardId { get; set; }
        public string LicensePlate { get; set; }
        public VehicalType VehicalType { get; set; }
    }
}
