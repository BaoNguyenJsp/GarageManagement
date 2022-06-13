import { Component, OnInit } from '@angular/core';
import { GarageFacade } from '@modules/garage/+state/garage.facade';
import { ParkingLevel } from '@modules/garage/classes/parking-level';

@Component({
  selector: 'app-parking-dashboard',
  templateUrl: './parking-dashboard.component.html',
  styleUrls: ['./parking-dashboard.component.scss']
})
export class ParkingDashboardComponent implements OnInit {

  constructor(private garageFacade: GarageFacade) { }

  parkingLevels$ = this.garageFacade.getParkingLevels$;
  getAvailableSpacesForMotorbikes$ = this.garageFacade.getAvailableSpacesForMotorbikes$;
  getAvailableSpacesForCars$ = this.garageFacade.getAvailableSpacesForCars$;

  selectedParkingLevel: ParkingLevel | null;

  ngOnInit(): void {
  }

  toggle(selectedItem: ParkingLevel | null) {
    this.selectedParkingLevel = selectedItem;
  }
}
