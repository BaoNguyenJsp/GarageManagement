import { GarageFacade } from './+state/garage.facade';
import { GARAGE_FEATURE_KEY, reducer as garageReducer } from '@modules/garage/+state/garage.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { GarageRoutingModule } from '@modules/garage/garage-routing.module';
import { ParkingLevelComponent } from '@modules/garage/components/parking-level/parking-level.component';
import { ParkingSpaceComponent } from '@modules/garage/components/parking-level/parking-space/parking-space.component';
import { EffectsModule } from '@ngrx/effects';
import { GarageService } from '@modules/garage/services/garage.service';
import { ParkingDashboardComponent } from './pages/parking-dashboard/parking-dashboard.component';
import { GarageEffects } from '@modules/garage/+state/garage.effects';
import { ParkingService } from '@modules/garage/services/parking.service';
import { GarageManagerComponent } from '@modules/garage/pages/parking-dashboard/garage-manager/garage-manager.component';
import { ParkingManagerComponent } from '@modules/garage/pages/parking-dashboard/parking-manager/parking-manager.component';


@NgModule({
  declarations: [
    ParkingLevelComponent,
    ParkingSpaceComponent,
    ParkingDashboardComponent,
    GarageManagerComponent,
    ParkingManagerComponent
  ],
  imports: [
    CommonModule,
    GarageRoutingModule,
    SharedModule,
    StoreModule.forFeature(GARAGE_FEATURE_KEY, garageReducer),
    EffectsModule.forFeature([GarageEffects]),
  ],
  providers: [
    GarageService,
    ParkingService,
    GarageFacade
  ]
})
export class GarageModule { }
