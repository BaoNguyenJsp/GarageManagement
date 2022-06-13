import { ParkingSpace } from '@modules/garage/classes/parking-space';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as garageActions from '@modules/garage/+state/garage.actions';
import { ParkingLevel } from '@modules/garage/classes/parking-level';
import { VehicalType } from '@modules/garage/enums/vehical-type';

export const GARAGE_FEATURE_KEY = 'garage';

export interface GarageState extends EntityState<ParkingLevel> {
  availableSpacesForCars: number;
  availableSpacesforMotobikes: number;
}

export const garageAdapter: EntityAdapter<ParkingLevel> = createEntityAdapter<ParkingLevel>(
  {
    selectId: parking_level => parking_level.id
  }
);

export const initialState: GarageState = garageAdapter.getInitialState({
  availableSpacesForCars: 0,
  availableSpacesforMotobikes: 0
});

const garageReducer = createReducer(
  initialState,
  on(garageActions.parkingLevelsRetrieved, (state, { parkingLevels: parking_levels }) => {
    var garageState = garageAdapter.addMany(parking_levels, state);
    var parking_level_state = Object.keys(garageState.entities).flatMap(parking_level => garageState.entities[parking_level] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: parking_level_state.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: parking_level_state.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
    }
  }),
  on(garageActions.parkingLevelCreated, (state, { parkingLevel: parking_level }) => {
    var garageState = garageAdapter.addOne(parking_level, state);

    return {
      ...garageState,
      availableSpacesForCars: state.availableSpacesForCars + parking_level.availableCarSpaces,
      availableSpacesforMotobikes: state.availableSpacesforMotobikes + parking_level.availableMotorbikeSpaces
    };
  }),
  on(garageActions.parkingLevelUpdated, (state, { parkingLevel: parking_level }) => {
    var garageState = garageAdapter.updateOne(parking_level, state);
    var current_parking_spaces = Object.keys(garageState.entities).flatMap(parking_level => garageState.entities[parking_level] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: current_parking_spaces.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: current_parking_spaces.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
    };
  }),
  on(garageActions.parkingLevelDeleted, (state, { parkingLevelId: parking_level_id }) => {
    var garageState = garageAdapter.removeOne(parking_level_id, state);
    var remaining_parking_spaces = Object.keys(garageState.entities).flatMap(parking_level => garageState.entities[parking_level] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: remaining_parking_spaces.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: remaining_parking_spaces.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
    };
  }),

  on(garageActions.parked, (state, { parkingLog }) => {
    const newState = garageAdapter.map(
      (level) => {
        if (level.id === parkingLog.parkingLevelId) {
          const parkingSpaces = level.parkingSpaces.map(space => {
            if (space.id != parkingLog.parkingSpaceId) {
              return space;
            }
            return { ...space, isUsed: true };
          });

          return {
            ...level,
            parkingSpaces: parkingSpaces,
            availableCarSpaces: parkingLog.vehicalType == VehicalType.Car ? level.availableCarSpaces - 1 : level.availableCarSpaces,
            availableSpacesforMotobikes: parkingLog.vehicalType == VehicalType.Motorbike ? level.availableMotorbikeSpaces - 1 : level.availableMotorbikeSpaces
          };
        }
        return level;
      },
      state
    );

    return {
      ...newState,
      availableSpacesForCars: parkingLog.vehicalType == VehicalType.Car ? state.availableSpacesForCars - 1 : state.availableSpacesForCars,
      availableSpacesforMotobikes: parkingLog.vehicalType == VehicalType.Motorbike ? state.availableSpacesforMotobikes - 1 : state.availableSpacesforMotobikes
    };
  }),

  on(garageActions.leaved, (state, { parkingLog }) => {
    const newState = garageAdapter.map(
      (level) => {
        if (level.id === parkingLog.parkingLevelId) {
          const parkingSpaces = level.parkingSpaces.map(space => {
            if (space.id != parkingLog.parkingSpaceId) {
              return space;
            }
            return { ...space, isUsed: false };
          });

          return {
            ...level,
            parkingSpaces: parkingSpaces,
            availableCarSpaces: parkingLog.vehicalType == VehicalType.Car ? level.availableCarSpaces + 1 : level.availableCarSpaces,
            availableSpacesforMotobikes: parkingLog.vehicalType == VehicalType.Motorbike ? level.availableMotorbikeSpaces + 1 : level.availableMotorbikeSpaces
          };
        }
        return level;
      },
      state
    );

    return {
      ...newState,
      availableSpacesForCars: parkingLog.vehicalType == VehicalType.Car ? state.availableSpacesForCars + 1 : state.availableSpacesForCars,
      availableSpacesforMotobikes: parkingLog.vehicalType == VehicalType.Motorbike ? state.availableSpacesforMotobikes + 1 : state.availableSpacesforMotobikes
    };
  })
);

export function reducer(state: GarageState | undefined, action: Action) {
  return garageReducer(state, action);
};
