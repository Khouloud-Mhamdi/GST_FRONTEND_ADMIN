import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forget-password-layout',
  templateUrl: './forget-password-layout.component.html',
  styleUrls: ['./forget-password-layout.component.css']
})
export class ForgetPasswordLayoutComponent implements OnInit {
  ForgetPasswordForm !: FormGroup ;
  title: string = "Login";
  user: any = {};
  vide=false;


  errorMessage = "";


  verrif = false ;
  erreur = false ;
  constructor(private titleService: Title ,private formBuilder : FormBuilder ,   private authService: AuthService,
  private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

    this.titleService.setTitle('Mot de passe oublié');
    this.ForgetPasswordForm = this.formBuilder.group({
      email : ["", [Validators.email,Validators.required]]


     });
  }
   forgetPassword()
  {
    if (this.ForgetPasswordForm.invalid) {
      this.ForgetPasswordForm.markAllAsTouched();
      return;
    }

    if(this.ForgetPasswordForm.value.email==="")
    {
      this.vide=true;
      setTimeout(() => {
        this.vide = false;
      }, 3000);
    }
    console.log(this.ForgetPasswordForm.value.email);
    this.authService.forgetPassword(this.ForgetPasswordForm.value.email).subscribe(
      (exist: boolean) => {
        if (exist === true )
        {this.verrif=true;
          setTimeout(() => {
            this.verrif = false;
          }, 4000);}

          else{
            this.erreur=true;
          setTimeout(() => {
            this.erreur = false;
          }, 3000);}

      },

    );
  }

}
