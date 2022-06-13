using Core.Manager;
using GarageAPI.Data;
using GarageAPI.Models;

namespace GarageAPI.Managers
{
    public class ParkingLevelManager : Manager<ParkingLevel>, IManager<ParkingLevel>
    {
        public ParkingLevelManager(GarageDbContext context) : base(context)
        {
        }
    }
}
