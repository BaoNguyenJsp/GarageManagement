using AutoMapper;
using GarageAPI.Constants;
using Core.Exceptions;
using GarageAPI.Dtos;
using GarageAPI.Enums;
using GarageAPI.Managers;
using GarageAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GarageAPI.Services
{
    public class ParkingService : IParkingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ParkingService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ParkingLogDto> Leave(Guid cardId)
        {
            var log = await _unitOfWork.ParkingLogs.Query(x => x.CardId == cardId && !x.LeaveTime.HasValue).FirstOrDefaultAsync();
            if (log == null)
            {
                throw new CustomException(ErrorResponseConstants.NotFound);
            }

            log.LeaveTime = DateTimeOffset.Now.ToUnixTimeSeconds();
            _unitOfWork.ParkingLogs.Update(log);

            var parkingLevel = await _unitOfWork.ParkingLevels.Query(x => x.Id == log.ParkingLevelId).FirstAsync();
            switch (log.VehicalType)
            {
                case VehicalType.Car:
                    parkingLevel.AvailableCarSpaces++;
                    break;
                default:
                    parkingLevel.AvailableMotorbikeSpaces++;
                    break;
            }
            _unitOfWork.ParkingLevels.Update(parkingLevel);
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<ParkingLogDto>(log);
            return result;
        }

        public async Task<ParkingLogDto> Park(CreateParkingLogDto data)
        {
            Expression<Func<ParkingLevel, bool>> filter = data.VehicalType switch
            {
                VehicalType.Car => x => x.AvailableCarSpaces > 0,
                VehicalType.Motorbike => x => x.AvailableMotorbikeSpaces > 0,
                _ => throw new CustomException(ErrorResponseConstants.NotFound),
            };

            var firstAvailableLevel = await _unitOfWork.ParkingLevels.Query(filter).Include(x => x.ParkingSpaces).FirstOrDefaultAsync();
            if (firstAvailableLevel == null)
            {
                throw new CustomException(ParkingResponseConstants.GarageIsFull);
            }

            var dataInUse = await _unitOfWork.ParkingLogs.Query(x => (x.CardId == data.CardId || x.LicensePlate == data.LicensePlate) && !x.LeaveTime.HasValue).FirstOrDefaultAsync();
            if (dataInUse != null)
            {
                if (dataInUse.CardId == data.CardId)
                {
                    throw new CustomException(ParkingResponseConstants.CardInUse);
                }
                if (dataInUse.LicensePlate == data.LicensePlate)
                {
                    throw new CustomException(ParkingResponseConstants.LicensePlateInUse);
                }
            }

            switch (data.VehicalType)
            {
                case VehicalType.Car:
                    firstAvailableLevel.AvailableCarSpaces--;
                    break;
                case VehicalType.Motorbike:
                    firstAvailableLevel.AvailableMotorbikeSpaces--;
                    break;
            }
            var inUseSpaces = await _unitOfWork.ParkingLogs.Query(x => x.ParkingLevelId == firstAvailableLevel.Id && !x.LeaveTime.HasValue).Select(x => x.ParkingSpaceId).ToListAsync();
            var firstAvailableSpace = firstAvailableLevel.ParkingSpaces.First(x => !inUseSpaces.Contains(x.Id) && x.VehicalType == data.VehicalType);

            var entity = _mapper.Map<ParkingLog>(data);
            entity.ParkingLevelId = firstAvailableLevel.Id;
            entity.ParkingSpaceId = firstAvailableSpace.Id;
            entity.ParkTime = DateTimeOffset.Now.ToUnixTimeSeconds();

            _unitOfWork.ParkingLogs.Add(entity);
            _unitOfWork.ParkingLevels.Update(firstAvailableLevel);
            await _unitOfWork.CompleteAsync();

            var result = _mapper.Map<ParkingLogDto>(entity);
            return result;
        }
    }
}
