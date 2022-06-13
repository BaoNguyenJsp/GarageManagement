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

  createParkingLevel(parking_level: CreateParkingLevel): Observable<ParkingLevel> {
    return this.http.post<ParkingLevel>(`${this.baseUrl}`, parking_level);
  }

  updateParkingLevel(id: string, parking_level: UpdateParkingLevel): Observable<ParkingLevel> {
    return this.http.put<ParkingLevel>(`${this.baseUrl}/${id}`, parking_level);
  }

  deleteParkingLevel(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
