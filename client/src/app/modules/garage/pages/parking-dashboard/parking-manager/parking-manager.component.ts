import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GarageFacade } from '@modules/garage/+state/garage.facade';
import { GarageState } from '@modules/garage/+state/garage.reducer';
import { Store } from '@ngrx/store';
import * as garageActions from "@modules/garage/+state/garage.actions";
import { VehicalType } from '@modules/garage/enums/vehical-type';

@Component({
  selector: 'app-parking-manager',
  templateUrl: './parking-manager.component.html',
  styleUrls: ['./parking-manager.component.scss']
})
export class ParkingManagerComponent implements OnInit {
  vehicalType = VehicalType;

  constructor(private store: Store<GarageState>, private garageFacade: GarageFacade) { }

  parkingLevels$ = this.garageFacade.getParkingLevels$;

  parkingForm = new FormGroup({
    cardId: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
    vehicalType: new FormControl(0, [Validators.required])
  });

  leavingForm = new FormGroup({
    cardId: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.store.dispatch(garageActions.getParkingLevels());
  }

  updateVehicalType(vehicalType: number) {
    this.parkingForm.controls.vehicalType.setValue(vehicalType);
  }

  park() {
    if (this.parkingForm.invalid) {
      return;
    }
    var parkingLog = this.parkingForm.value;
    this.store.dispatch(garageActions.parking({ parkingLog }));
  }

  leave() {
    if (this.leavingForm.invalid) {
      return;
    }
    var cardId = this.leavingForm.get('cardId')!.value;
    this.store.dispatch(garageActions.leaving({ cardId }));
  }
}
