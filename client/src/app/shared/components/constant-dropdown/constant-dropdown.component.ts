import { ConstantDropdownValue } from './constant-dropdown-value.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-constant-dropdown',
  templateUrl: './constant-dropdown.component.html',
  styleUrls: ['./constant-dropdown.component.scss']
})
export class ConstantDropdownComponent implements OnInit {
  @Input() enum: any;
  @Output() valueChanges = new EventEmitter<number>();

  options: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.options = Object.keys(this.enum).filter(x => isNaN(parseInt(x))).map(key => {
      var option: ConstantDropdownValue = {
        name: key,
        value: this.enum[key]
      }
      return option;
    });
    console.log(this.options);
  }

  selectOption(value: string) {
    this.valueChanges.emit(parseInt(value));
  }
}
