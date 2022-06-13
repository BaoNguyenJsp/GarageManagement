import { ParkingLog } from '@modules/garage/classes/parking-log';
import { CreateParkingLog, UpdateParkingLevel } from '@modules/garage/+state/garage.models';
import { CreateParkingLevel } from '@modules/garage/+state/garage.models';
import { ParkingLevel } from '@modules/garage/classes/parking-level';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const createParkingLevel = createAction(
  '[Garage] Create Parking Level',
  props<{ parkingLevel: CreateParkingLevel }>()
);

export const parkingLevelCreated = createAction(
  '[Garage] Parking Level Created',
  props<{ parkingLevel: ParkingLevel }>()
);

export const updateParkingLevel = createAction(
  '[Garage] Update Parking Level',
  props<{ id: string, parkingLevel: UpdateParkingLevel }>()
);

export const parkingLevelUpdated = createAction(
  '[Garage] Parking Level Updated',
  props<{ parkingLevel: Update<ParkingLevel> }>()
);

export const deleteParkingLevel = createAction(
  '[Garage] Delete Parking Level',
  props<{ parkingLevelId: string }>()
);

export const parkingLevelDeleted = createAction(
  '[Garage] Parking Level Deleted',
  props<{ parkingLevelId: string }>()
);

export const getParkingLevels = createAction(
  '[Garage] Get Parking Levels'
);

export const parkingLevelsRetrieved = createAction(
  '[Garage] Parking Level Retrieved',
  props<{ parkingLevels: ParkingLevel[] }>()
);

export const parking = createAction(
  '[Garage] Parking',
  props<{ parkingLog: CreateParkingLog }>()
);

export const parked = createAction(
  '[Garage] Parked',
  props<{ parkingLog: ParkingLog }>()
);

export const leaving = createAction(
  '[Garage] Leaving',
  props<{ cardId: string }>()
);

export const leaved = createAction(
  '[Garage] Leaved',
  props<{ parkingLog: ParkingLog }>()
);
