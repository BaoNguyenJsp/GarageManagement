using GarageAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GarageAPI.Data
{
    public class GarageDbContext : DbContext
    {
        public DbSet<ParkingLevel> ParkingLevels { get; set; }
        public DbSet<ParkingSpace> ParkingSpaces { get; set; }
        public DbSet<ParkingLog> ParkingLogs { get; set; }

        public GarageDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
