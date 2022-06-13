import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GarageFacade } from '@modules/garage/+state/garage.facade';
import { GarageState } from '@modules/garage/+state/garage.reducer';
import { ParkingLevel } from '@modules/garage/classes/parking-level';
import * as garageActions from "@modules/garage/+state/garage.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-garage-manager',
  templateUrl: './garage-manager.component.html',
  styleUrls: ['./garage-manager.component.scss']
})
export class GarageManagerComponent implements OnInit {
  @Output() parkingLevelSelected = new EventEmitter<(ParkingLevel | null)>();

  constructor(private store: Store<GarageState>, private garageFacade: GarageFacade) { }

  parkingLevels$ = this.garageFacade.getParkingLevels$;

  selectedParkingLevel: ParkingLevel | null;

  manageForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    carSpaces: new FormControl(0, [Validators.required]),
    motorbikeSpaces: new FormControl(0, [Validators.required])
  });

  ngOnInit(): void {
    this.store.dispatch(garageActions.getParkingLevels());
  }

  toggle(selectedItem: ParkingLevel) {
    if (this.selectedParkingLevel?.id == selectedItem.id) {
      this.selectedParkingLevel = null;
      this.parkingLevelSelected.emit(this.selectedParkingLevel);
    } else {
      this.selectedParkingLevel = selectedItem;
      this.parkingLevelSelected.emit(this.selectedParkingLevel);
    }
  }

  create() {
    if (this.manageForm.invalid) {
      return;
    }
    var parkingLevel = this.manageForm.value;
    this.store.dispatch(garageActions.createParkingLevel({ parkingLevel }));
  }

  update() {
    if (this.manageForm.invalid || !this.selectedParkingLevel) {
      return;
    }
    var parking_level = this.manageForm.value;
    this.store.dispatch(garageActions.updateParkingLevel({ id: this.selectedParkingLevel.id, parkingLevel: parking_level }));
  }

  delete() {
    if (!this.selectedParkingLevel) {
      return;
    }
    this.store.dispatch(garageActions.deleteParkingLevel({ parkingLevelId: this.selectedParkingLevel.id }))
  }
}
