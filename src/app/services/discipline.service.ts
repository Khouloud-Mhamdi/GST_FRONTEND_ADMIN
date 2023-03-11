import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
 DisciplineURL = "http://localhost:8080/disciplines";

  constructor(private httpClient: HttpClient) { }

  ListeDesDisciplines() {
  return this.httpClient.get(this.DisciplineURL+"/Consulter/");
}
  DisciplineById( id : any) {
  return this.httpClient.get(this.DisciplineURL+"/Rechercher/" +id);
}
}

