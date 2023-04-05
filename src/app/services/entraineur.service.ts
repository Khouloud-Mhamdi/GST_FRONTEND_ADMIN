import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntraineurService {
  entraineursURL = "http://localhost:8080/entraineurs";
  constructor(private httpClient : HttpClient) { }
  addentraineur(entraineur : any , id : number ){
    return this.httpClient.post(this.entraineursURL + "/ajouter" + '/' + id , entraineur ) ; 
  }

  updateEntraineur(entraineur : any  , id : number ){
    return this.httpClient.put(this.entraineursURL + "/Modifier" + '/' + id, entraineur ) ; 
  }

  deleteEntraineurById (id : number ) {
    return this.httpClient.delete(`${this.entraineursURL}/${id}`); 
  }
  
  getentraineurById (id : number ) {
    return this.httpClient.get(`${this.entraineursURL}/${id}`) ; 
  }
  
  getAllentraineurs () {
    return this.httpClient.get(this.entraineursURL+"/Consulter");
  }
  listerEntraineurs () {
    return this.httpClient.get(this.entraineursURL +"/consultation") ; 
  }
  ExistEmail (email :any) :Observable<boolean>{
    return this.httpClient.get<boolean> (this.entraineursURL +"/ExistEmail/" +email);
  }
  RechercherEntraineur (critere : any ) {
    return this.httpClient.get(this.entraineursURL + "/rechercher/" + critere )
  }
}
 