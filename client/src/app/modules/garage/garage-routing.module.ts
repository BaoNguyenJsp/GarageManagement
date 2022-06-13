import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingDashboardComponent } from '@modules/garage/pages/parking-dashboard/parking-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ParkingDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
