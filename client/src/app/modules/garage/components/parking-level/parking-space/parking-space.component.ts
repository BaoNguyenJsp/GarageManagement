import { Component, Input, OnInit } from '@angular/core';
import { VehicalType } from '@modules/garage/enums/vehical-type';
import { ParkingSpace } from '@modules/garage/classes/parking-space';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.scss']
})
export class ParkingSpaceComponent implements OnInit {
  vehicalType = VehicalType;

  @Input() parkingSpace: ParkingSpace;

  constructor() { }

  ngOnInit(): void {
  }

  update() {
  }
}
