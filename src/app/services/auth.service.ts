import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }
  userURL: string = "http://localhost:8080/api/auth";
  URL : string ="http://localhost:8080/utilisateurs/"

  login(user : any ) {
    return this.http.post<{accessToken:any}>(this.userURL + "/login", user);
  }

  register(user : any ): Observable<any> {
    return this.http.post(this.userURL + "/signup", user);
  }
  updateUser(user: any): Observable<any> {
    const url = `${this.userURL}/UpdateCurrentUser`;
    return this.http.put<any>(url, user);
  }
  changerMotDePasse(Id:number ,NewPassword:any) :Observable<boolean>
  {return this.http.get<boolean> (this.userURL + "/ChangerPassword/"+ Id + "/" +NewPassword)}

  forgetPassword (email :any) :Observable<boolean>{
    return this.http.get<boolean> (this.URL +"forgot-password/" +email);
  }
  resetPassword (token :any,password:any) :Observable<boolean>{
    return this.http.get<boolean> (this.URL +"resetPassword/"+ token + "/" +password);
  }

  getCurrentUserById(id:number){
    return this.http.get(`${this.userURL}/${id}`)
  }
  // ajouter un moderateur ou gestionnaire :
  addNewUser(user : any ) : Observable<any> {
    return this.http.post(this.userURL + "/addUser" , user);
  }
  ExistEmail (email :any) :Observable<boolean>{
    return this.http.get<boolean> (this.userURL +"/ExistEmail/" +email);
  }
  ModifierPassword(loginRequest: any): Observable<boolean> {
    return this.http.post<boolean>(this.userURL+"/ModifierPassword", loginRequest);
  }
}
