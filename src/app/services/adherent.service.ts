import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  playerURL = "http://localhost:8080/utilisateurs/Consulter";
  constructor(private httpClient: HttpClient ) { }

  ListeDesAdhérents() {
    return this.httpClient.get(this.playerURL);
  }
}
