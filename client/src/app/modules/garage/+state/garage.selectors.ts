import { createFeatureSelector, createSelector } from '@ngrx/store';
import { garageAdapter, GarageState, GARAGE_FEATURE_KEY } from '@modules/garage/+state/garage.reducer';

export const getGarageState = createFeatureSelector<GarageState>(GARAGE_FEATURE_KEY);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = garageAdapter.getSelectors();

export const getParkingLevels = createSelector(
  getGarageState,
  (state: GarageState) => selectAll(state)
);

export const getAvailableSpacesForCars = createSelector(
  getGarageState,
  (state: GarageState) => state.availableSpacesForCars
);

export const getAvailableSpacesForMotorbikes = createSelector(
  getGarageState,
  (state: GarageState) => state.availableSpacesforMotobikes
);
