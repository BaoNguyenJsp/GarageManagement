import { ParkingSpace } from "@modules/garage/classes/parking-space";

export class ParkingLevel {
  id: string;
  code: string;
  order: number;
  parkingSpaces: ParkingSpace[];
  availableCarSpaces: number;
  availableMotorbikeSpaces: number;
}
