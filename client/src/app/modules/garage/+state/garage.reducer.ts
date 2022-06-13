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
  on(garageActions.parkingLevelsRetrieved, (state, { parkingLevels }) => {
    var garageState = garageAdapter.addMany(parkingLevels, state);
    var parkingLevelState = Object.keys(garageState.entities).flatMap(parkingLevel => garageState.entities[parkingLevel] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: parkingLevelState.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: parkingLevelState.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
    }
  }),
  on(garageActions.parkingLevelCreated, (state, { parkingLevel }) => {
    var garageState = garageAdapter.addOne(parkingLevel, state);

    return {
      ...garageState,
      availableSpacesForCars: state.availableSpacesForCars + parkingLevel.availableCarSpaces,
      availableSpacesforMotobikes: state.availableSpacesforMotobikes + parkingLevel.availableMotorbikeSpaces
    };
  }),
  on(garageActions.parkingLevelUpdated, (state, { parkingLevel }) => {
    var garageState = garageAdapter.updateOne(parkingLevel, state);
    var currentParkingSpaces = Object.keys(garageState.entities).flatMap(parkingLevel => garageState.entities[parkingLevel] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: currentParkingSpaces.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: currentParkingSpaces.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
    };
  }),
  on(garageActions.parkingLevelDeleted, (state, { parkingLevelId }) => {
    var garageState = garageAdapter.removeOne(parkingLevelId, state);
    var remainingParkingSpaces = Object.keys(garageState.entities).flatMap(parkingLevel => garageState.entities[parkingLevel] as ParkingLevel);

    return {
      ...garageState,
      availableSpacesForCars: remainingParkingSpaces.reduce((c, p) => c + p.availableCarSpaces, 0),
      availableSpacesforMotobikes: remainingParkingSpaces.reduce((c, p) => c + p.availableMotorbikeSpaces, 0)
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
