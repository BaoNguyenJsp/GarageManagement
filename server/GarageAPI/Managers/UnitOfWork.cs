using GarageAPI.Data;
using System;
using System.Threading.Tasks;

namespace GarageAPI.Managers
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly GarageDbContext _context;

        public ParkingLevelManager ParkingLevels { get; private set; }
        public ParkingLogManager ParkingLogs { get; private set; }

        public UnitOfWork(GarageDbContext context)
        {
            _context = context;

            ParkingLevels = new ParkingLevelManager(_context);
            ParkingLogs = new ParkingLogManager(_context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
