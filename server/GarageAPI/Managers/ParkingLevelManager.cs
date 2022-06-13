using Core.Manager;
using GarageAPI.Data;
using GarageAPI.Models;

namespace GarageAPI.Managers
{
    public class ParkingLogManager : Manager<ParkingLog>, IManager<ParkingLog>
    {
        public ParkingLogManager(GarageDbContext context) : base(context)
        {
        }
    }
}
