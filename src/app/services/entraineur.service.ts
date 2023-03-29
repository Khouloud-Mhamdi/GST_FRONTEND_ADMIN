import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntraineurService {
  entraineursURL = "http://localhost:8080/entraineurs";
  constructor(private httpClient : HttpClient) { }
  addentraineur(entraineur : any ){
    return this.httpClient.post(this.entraineursURL + "/ajouter" , entraineur ) ; 
  }

  updateEvnet (entraineur : any ){
    return this.httpClient.put(this.entraineursURL + "/Modifier" , entraineur ) ; 
  }

  deleteentraineurById (id : number ) {
    return this.httpClient.delete(`${this.entraineursURL}/${id}`); 
  }
  
  getentraineurById (id : number ) {
    return this.httpClient.get(`${this.entraineursURL}/${id}`) ; 
  }
  
  getAllentraineurs () {
    return this.httpClient.get(this.entraineursURL+"/Consulter");
  }
}
 