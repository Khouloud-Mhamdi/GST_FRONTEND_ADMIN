import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/reservation';
  constructor(private http: HttpClient) { }
 
  getReservationsByDateAndTerrainAndStatus(dateString: string, terrainId: number): Observable<any[]> {
    const url = `${this.baseUrl}/liste/${dateString}/${terrainId}`;
    return this.http.get<any[]>(url);
  }
  validerReservation(id: number, email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/validation/${id}/${email}`);
  }
  refuserReservation(id: number, email: string): Observable<boolean> {
    const url = `${this.baseUrl}/refuser/${id}/${email}`;
    return this.http.get<boolean>(url);
  }
  getReservationsEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reservations-en-attente`);
  }
}
