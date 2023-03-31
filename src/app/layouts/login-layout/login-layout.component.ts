import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {
  connect = false  ;
  erreur = false  ;
  role !: String ;
  title: string = "Login";
  loginForm !: FormGroup ;
  isLoggedIn = false;
  isLoginFailed = false;
  constructor(private titleService: Title ,  private router : Router , private formBuilder : FormBuilder ,   private authService: AuthService , private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    this.titleService.setTitle('Connexion');
    this.loginForm = this.formBuilder.group({
      email : ["", [Validators.email]],
      password : ["", [Validators.required ]],
     });
  }
  login(){
    console.log("This is my user : ", this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log("here data after login", data);
        console.log("here data after login", data);

        this.tokenStorage.saveToken(data.accessToken);
       // console.log("Here decoded token", this.getDecodedAccessToken(data.accessToken));

        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        if (this.role === 'ADHERENT') {
          // Rediriger vers la page d'administration
          this.router.navigate(['/admin']);
        } else if (this.role === 'GESTIONNAIRE') {
          // Rediriger vers la page de gestionnaire
          this.router.navigate(['/gestionnaire']);
        }
        else if (this.role === 'MODERATEUR') {
          // Rediriger vers la page de gestionnaire
          this.router.navigate(['/moderateur']);
        }



      },
      (err) => {
        console.log("here error after login", err);
        this.erreur= true ;
        setTimeout(() => {
         this.erreur = false;
       }, 3000); // 3000 ms = 3 secondes
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    );
  }
}
