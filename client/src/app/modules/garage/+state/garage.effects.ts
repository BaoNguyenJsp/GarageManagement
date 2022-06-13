import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as garageActions from "@modules/garage/+state/garage.actions";
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { GarageService } from '@modules/garage/services/garage.service';
import { EMPTY } from "rxjs";
import { ParkingLevel } from "@modules/garage/classes/parking-level";
import { Update } from "@ngrx/entity";
import { ParkingService } from "@modules/garage/services/parking.service";

@Injectable()
export class GarageEffects {
  getParkingLevels$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.getParkingLevels),
    mergeMap(_ => this.garageService.getParkingLevels().pipe(
      map(parking_levels => garageActions.parkingLevelsRetrieved({ parkingLevels: parking_levels })),
      catchError(_ => EMPTY)
    ))
  ));

  createParkingLevels$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.createParkingLevel),
    switchMap(_ => this.garageService.createParkingLevel(_.parkingLevel).pipe(
      map(parking_level => garageActions.parkingLevelCreated({ parkingLevel: parking_level })),
      catchError(_ => EMPTY)
    ))
  ));

  updateParkingLevels$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.updateParkingLevel),
    switchMap(_ => this.garageService.updateParkingLevel(_.id, _.parkingLevel).pipe(
      map(parking_level => {
        const updatedParkingLevel: Update<ParkingLevel> = {
          id: parking_level.id,
          changes: {
            ...parking_level
          }
        }
        return garageActions.parkingLevelUpdated({ parkingLevel: updatedParkingLevel })
      }),
      catchError(_ => EMPTY)
    ))
  ));

  deleteParkingLevels$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.deleteParkingLevel),
    switchMap(data => this.garageService.deleteParkingLevel(data.parkingLevelId).pipe(
      map(_ => garageActions.parkingLevelDeleted({ parkingLevelId: data.parkingLevelId })),
      catchError(_ => EMPTY)
    ))
  ));

  parking$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.parking),
    switchMap(data => this.parkingService.park(data.parkingLog).pipe(
      map(parkingLog => garageActions.parked({ parkingLog })),
      catchError(_ => EMPTY)
    ))
  ));

  leaving$ = createEffect(() => this.actions$.pipe(
    ofType(garageActions.leaving),
    switchMap(data => this.parkingService.leave(data.cardId).pipe(
      map(parkingLog => garageActions.leaved({ parkingLog })),
      catchError(_ => EMPTY)
    ))
  ));

  constructor(
    private actions$: Actions,
    private garageService: GarageService,
    private parkingService: ParkingService
  ) {
  }
}
