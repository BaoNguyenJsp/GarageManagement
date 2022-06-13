import { Injectable } from "@angular/core";
import { GarageState } from "@modules/garage/+state/garage.reducer";
import { Store } from "@ngrx/store";
import * as GarageSelectors from './garage.selectors';

@Injectable()
export class GarageFacade {
  constructor(private store: Store<GarageState>) {
  }

  getParkingLevels$ = this.store.select(GarageSelectors.getParkingLevels);
  getAvailableSpacesForCars$ = this.store.select(GarageSelectors.getAvailableSpacesForCars);
  getAvailableSpacesForMotorbikes$ = this.store.select(GarageSelectors.getAvailableSpacesForMotorbikes);
}

