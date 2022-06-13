import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateParkingLevel, UpdateParkingLevel } from "@modules/garage/+state/garage.models";
import { ParkingLevel } from "@modules/garage/classes/parking-level";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class GarageService {
  baseUrl = `${environment.baseApiUrl}/garage`;

  constructor(private http: HttpClient) { }

  getParkingLevels(): Observable<ParkingLevel[]> {
    return this.http.get<ParkingLevel[]>(`${this.baseUrl}`);
  }

  createParkingLevel(parkingLevel: CreateParkingLevel): Observable<ParkingLevel> {
    return this.http.post<ParkingLevel>(`${this.baseUrl}`, parkingLevel);
  }

  updateParkingLevel(id: string, parkingLevel: UpdateParkingLevel): Observable<ParkingLevel> {
    return this.http.put<ParkingLevel>(`${this.baseUrl}/${id}`, parkingLevel);
  }

  deleteParkingLevel(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
