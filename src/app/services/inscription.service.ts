import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  InscriURL = "http://localhost:8080/inscription";
  MembreURL = "http://localhost:8080/famille";

  constructor(private httpClient: HttpClient  ) {}




  DemandeInscriptions() {
    return this.httpClient.get(this.InscriURL+"/demandes-inscription");
  }
   RechercheInscriptions(recherche : any) {
    return this.httpClient.get(this.InscriURL+"/RechercheInscriptions/"+ recherche);
  }
  SupprimerInscription(id : any ){
    return this.httpClient.delete (this.InscriURL+ "/Supprimer/" +id);
  }
  SupprimerMembre(id : any ){
    return this.httpClient.delete (this.MembreURL+ "/Supprimer/" +id);
  }
  RefuserInscription(id:any , mail : any) {
    return this.httpClient.get(this.InscriURL+"/refus/" +id+ "/" +mail);
  }
  ValiderInscription( id:any ,mail : any ) {
    return this.httpClient.get(this.InscriURL+"/validation/" + id + "/" +mail);
  }
  ListeDesMembres() {
    return this.httpClient.get(this.InscriURL+"/ListeDesMembres");
  }
   RechercherMembres(recherche : any) {
    return this.httpClient.get(this.InscriURL+"/RechercherMembres/"+ recherche);
  }
  EmailSuppressionMembre(mail : any) {
    return this.httpClient.get(this.InscriURL+"/EmailSuppression/"+ mail);
  }

}
