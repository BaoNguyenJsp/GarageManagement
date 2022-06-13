using GarageAPI.Dtos;
using GarageAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GarageAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly IParkingService _parkingService;

        public ParkingController(IParkingService parkingService)
        {
            _parkingService = parkingService;
        }

        [HttpPost]
        public async Task<ParkingLogDto> Park(CreateParkingLogDto data)
        {
            return await _parkingService.Park(data);
        }

        [HttpPut("{cardId}")]
        public async Task<ParkingLogDto> Leave([FromRoute] Guid cardId)
        {
            return await _parkingService.Leave(cardId);
        }
    }
}
