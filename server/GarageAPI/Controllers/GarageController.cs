using GarageAPI.Dtos;
using GarageAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarageAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GarageController : ControllerBase
    {
        private readonly IGarageService _garageService;

        public GarageController(IGarageService service)
        {
            _garageService = service;
        }

        [HttpGet]
        public async Task<IEnumerable<ParkingLevelDto>> Get()
        {
            var results = await _garageService.Get();
            return results;
        }

        [HttpPost]
        public async Task<ParkingLevelDto> Create([FromBody] CreateParkingLevelDto data)
        {
            return await _garageService.Create(data);
        }

        [HttpPut("{id}")]
        public async Task<ParkingLevelDto> Put([FromRoute] Guid id, [FromBody] UpdateParkingLevelDto data)
        {
            return await _garageService.Update(id, data);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete([FromRoute] Guid id)
        {
            return await _garageService.Delete(id);
        }
    }
}
