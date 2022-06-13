import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ParkingLog } from '@modules/garage/classes/parking-log';
import { CreateParkingLog } from "@modules/garage/+state/garage.models";

@Injectable()
export class ParkingService {
  baseUrl = `${environment.baseApiUrl}/parking`;

  constructor(private http: HttpClient) { }

  park(parkingLog: CreateParkingLog): Observable<ParkingLog> {
    return this.http.post<ParkingLog>(`${this.baseUrl}`, parkingLog);
  }

  leave(careId: string): Observable<ParkingLog> {
    return this.http.put<ParkingLog>(`${this.baseUrl}/${careId}`, {});
  }
}
