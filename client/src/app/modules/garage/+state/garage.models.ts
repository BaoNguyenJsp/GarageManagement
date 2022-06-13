import { VehicalType } from '@modules/garage/enums/vehical-type';
export interface ParkingLevel {
  code: string;
  order: number;
  parkingSpaces: ParkingSpace[];
  availableCarSpaces: number;
  availableMotorbikeSpaces: number;
}

export interface ParkingSpace {
  parkingSpace: number;
  vehicalType: VehicalType;
}

export interface CreateParkingLevel {
  code: string;
  carSpaces: number;
  motorbikeSpaces: number;
}

export interface UpdateParkingLevel {
  id: string;
  code: string;
  carSpaces: number;
  motorbikeSpaces: number;
}

export interface CreateParkingLog {
  cardId: string;
  licensePlate: string;
  vehicalType: VehicalType;
}
