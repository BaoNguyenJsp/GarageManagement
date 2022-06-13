import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConstantDropdownComponent } from './components/constant-dropdown/constant-dropdown.component';


@NgModule({
  declarations: [
    ConstantDropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConstantDropdownComponent
  ]
})
export class SharedModule { }
