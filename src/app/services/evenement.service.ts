import { HttpClient  ,  HttpEvent ,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  eventsURL = "http://localhost:8080/api/events";
  public dataForm !:  FormGroup; 
  constructor(private http : HttpClient) { }

  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.eventsURL}`, formData);
  }
 
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }

}
