import { Component, Input, OnInit } from '@angular/core';
import { ParkingLevel } from '@modules/garage/classes/parking-level';
import { VehicalType } from '@modules/garage/enums/vehical-type';

@Component({
  selector: 'app-parking-level',
  templateUrl: './parking-level.component.html',
  styleUrls: ['./parking-level.component.scss']
})
export class ParkingLevelComponent implements OnInit {
  vehicalType = VehicalType;

  @Input() parkingLevel: ParkingLevel;

  constructor() { }

  ngOnInit(): void {
  }
}
