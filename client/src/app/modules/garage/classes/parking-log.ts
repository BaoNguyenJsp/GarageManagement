import { VehicalType } from "@modules/garage/enums/vehical-type";

export class ParkingLog {
  cardId: string;
  parkingLevelId: string;
  parkingSpaceId: string;
  parkingSlot: string;
  licensePlate: string;
  vehicalType: VehicalType
  parkTime: number;
  leaveTime: number;
}
