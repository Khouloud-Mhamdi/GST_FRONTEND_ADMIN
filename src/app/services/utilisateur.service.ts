import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  UserURL = "http://localhost:8080/utilisateurs";
  InscriURL = "http://localhost:8080/inscription";

  constructor(private httpClient: HttpClient  ) {}


  ListeDesUtilisateurs(role : any) {
    return this.httpClient.get(this.UserURL+"/ListeDesUtilisateurs/"+ role);
  }

  RechercherUtilisateur(role:any ,query: any) {
    return this.httpClient.get(this.UserURL+"/RechercherUtilisateur/"+ role + "/" +query ) ;
  }
  SupprimerUtilisateur(id : any ){
    return this.httpClient.delete (this.UserURL+ "/Supprimer/" +id);
  }
  ListeAvecDisciplines(role : any) {
    return this.httpClient.get(this.UserURL+"/ListeAvecDisciplines/"+ role);
  }

  DemandeInscriptions() {
    return this.httpClient.get(this.InscriURL+"/demandes-inscription");
  }
   RechercheInscriptions(recherche : any) {
    return this.httpClient.get(this.InscriURL+"/RechercheInscriptions/"+ recherche);
  }
  SupprimerInscription(id : any ){
    return this.httpClient.delete (this.InscriURL+ "/Supprimer/" +id);
  }
  EnvoyerEmailRefus(mail : any) {
    return this.httpClient.get(this.InscriURL+"/refus/"+ mail);
  }
  //partie moderateur ( consultation des membres )
  consulterMembreParModerateur(discipline : any ){
    return this.httpClient.get(this.InscriURL+"/membres/" + discipline ) ; 
  }
  RechercherMembreParModerateur(critere : any , discipline : any ) {
    return this.httpClient.get(this.InscriURL+"/rechercheMembres/" + critere + "/" + discipline ) ; 
  }
}
