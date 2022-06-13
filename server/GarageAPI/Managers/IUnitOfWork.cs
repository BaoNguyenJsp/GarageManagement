using System.Threading.Tasks;

namespace GarageAPI.Managers
{
    public interface IUnitOfWork
    {
        ParkingLevelManager ParkingLevels { get; }
        ParkingLogManager ParkingLogs { get; }

        Task CompleteAsync();
    }
}
