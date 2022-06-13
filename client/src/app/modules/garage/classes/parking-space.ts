import { VehicalType } from "@modules/garage/enums/vehical-type";

export class ParkingSpace {
  public id: string;
  public parkingSlot: number;
  public vehicalType: VehicalType;
  public isUsed: boolean;
}
