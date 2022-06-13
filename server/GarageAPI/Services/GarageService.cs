using AutoMapper;
using GarageAPI.Constants;
using Core.Exceptions;
using GarageAPI.Dtos;
using GarageAPI.Enums;
using GarageAPI.Managers;
using GarageAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GarageAPI.Services
{
    public class GarageService : IGarageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GarageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ParkingLevelDto> Create(CreateParkingLevelDto data)
        {
            var entity = _mapper.Map<ParkingLevel>(data);
            entity.ParkingSpaces = new List<ParkingSpace>();
            
            for (int i = 1; i <= entity.AvailableCarSpaces; i++)
            {
                entity.ParkingSpaces.Add(new ParkingSpace
                {
                    ParkingSlot = i,
                    VehicalType = VehicalType.Car
                });
            }

            for (int i = 1 + entity.AvailableCarSpaces; i <= entity.AvailableCarSpaces + entity.AvailableMotorbikeSpaces; i++)
            {
                entity.ParkingSpaces.Add(new ParkingSpace
                {
                    ParkingSlot = i,
                    VehicalType = VehicalType.Motorbike
                });
            }

            _unitOfWork.ParkingLevels.Add(entity);
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<ParkingLevelDto>(entity);
            return result;
        }

        public async Task<bool> Delete(Guid id)
        {
            var entity = await _unitOfWork.ParkingLevels.Query(x => x.Id == id).FirstOrDefaultAsync();
            if (entity == null)
            {
                throw new CustomException(ErrorResponseConstants.NotFound);
            }

            var isUsing = await _unitOfWork.ParkingLogs.Query(x => x.ParkingLevelId == id && !x.LeaveTime.HasValue).AnyAsync();
            if (isUsing)
            {
                throw new CustomException(ParkingResponseConstants.ParkingLevelIsInUse);
            }

            _unitOfWork.ParkingLevels.Remove(entity);
            await _unitOfWork.CompleteAsync();

            return true;
        }

        public async Task<IEnumerable<ParkingLevelDto>> Get()
        {
            var entities = await _unitOfWork.ParkingLevels.Query().Include(x => x.ParkingSpaces).ToListAsync();

            var results = _mapper.Map<IEnumerable<ParkingLevelDto>>(entities);
            var inUseSpaces = await _unitOfWork.ParkingLogs.Query(x => !x.LeaveTime.HasValue).Select(x => x.ParkingSpaceId).ToListAsync();
            results = results.Select(x =>
            {
                x.ParkingSpaces = x.ParkingSpaces.Select(y =>
                {
                    y.IsUsed = inUseSpaces.Contains(y.Id);
                    return y;
                }).ToList();
                return x;
            }).ToList();

            return results;
        }

        public async Task<ParkingLevelDto> Update(Guid id, UpdateParkingLevelDto data)
        {
            // Delete the entity and create a whole Parking Level. TODO: Find a proper solution to update entity hierachy.
            await Delete(id);

            var entity = _mapper.Map<ParkingLevel>(data);
            // Keep the id to match with the old data in client side
            entity.Id = id;

            for (int i = 1; i <= entity.AvailableCarSpaces; i++)
            {
                entity.ParkingSpaces.Add(new ParkingSpace
                {
                    ParkingSlot = i,
                    VehicalType = VehicalType.Car
                });
            }

            for (int i = 1 + entity.AvailableCarSpaces; i <= entity.AvailableCarSpaces + entity.AvailableMotorbikeSpaces; i++)
            {
                entity.ParkingSpaces.Add(new ParkingSpace
                {
                    ParkingSlot = i,
                    VehicalType = VehicalType.Motorbike
                });
            }

            _unitOfWork.ParkingLevels.Add(entity);
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<ParkingLevelDto>(entity);
            return result;
        }
    }
}
