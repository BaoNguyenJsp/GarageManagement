using GarageAPI.Managers;
using GarageAPI.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GarageAPI.Configs
{
    public static class IoCExtensions
    {
        public static void AddDI(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IGarageService, GarageService>();
            services.AddScoped<IParkingService, ParkingService>();
        }
    }
}
