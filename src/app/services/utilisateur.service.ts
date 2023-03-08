import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  UserURL = "http://localhost:8080/utilisateurs";

  constructor(private httpClient: HttpClient ) { }

  ListeDesUtilisateurs(role : any) {
    return this.httpClient.get(this.UserURL+"/ListeDesUtilisateurs/"+ role);
  }
  SupprimerUtilisateur(id : any ){
    return this.httpClient.delete(this.UserURL+ "/Supprimer/" +id);
  }
}
