import { HttpClient  ,  HttpEvent ,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  eventsURL = "http://localhost:8080/api/events";
  public  host = "http://localhost:8080" ; 
  public dataForm !:  FormGroup; 
  public listData :  any ; 
  constructor(private http : HttpClient) { }

  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.eventsURL}`, formData);
  }
 
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST','<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
   getAll(): Observable<any> {
   
    return this.http.get(`${this.eventsURL}`);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.eventsURL}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.eventsURL}/${id}`, { responseType: 'text' });
  }
 /*updatEvent (formData : FormData , id : number  ) {
    return this.http.post(`${this.eventsURL}/${id}` ,  formData);
  }*/
  updatEvent(event : any){
    return this.http.put(this.host+ "/api/modifier" , event ); 
  }
  RechercherEvenement(query: any) {
    return this.http.get(this.host+"/api/searchEvent/" +query ) ;
  }
}
