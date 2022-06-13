import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleableDirective } from './directives/toggleable.directive';
import { ConstantDropdownComponent } from './components/constant-dropdown/constant-dropdown.component';
import { UnixTimestampPipe } from './pipes/unix-timestamp.pipe';


@NgModule({
  declarations: [
    ToggleableDirective,
    ConstantDropdownComponent,
    UnixTimestampPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToggleableDirective,
    ConstantDropdownComponent,
    UnixTimestampPipe
  ]
})
export class SharedModule { }
