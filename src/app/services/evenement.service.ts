import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  eventsURL = "http://localhost:8080/events";
  constructor(private httpClient : HttpClient) { }

 


}
