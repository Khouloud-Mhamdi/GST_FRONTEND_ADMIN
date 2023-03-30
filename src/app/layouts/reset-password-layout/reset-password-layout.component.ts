import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { mustMatch } from 'src/app/validators/mustMatch';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password-layout',
  templateUrl: './reset-password-layout.component.html',
  styleUrls: ['./reset-password-layout.component.css']
})
export class ResetPasswordLayoutComponent implements OnInit {

  ResetPasswordForm !: FormGroup ;

  errorMessage = "";
  updated = false ;
  erreur = false ;
  token:any;
  showConfirmationDialog = false;




  constructor(private titleService: Title ,private router: Router, private formBuilder : FormBuilder ,  private authService: AuthService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle('Récupérer mot de passe');
    this.ResetPasswordForm = this.formBuilder.group({

      password : ["", [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]],
      confirm : ["" , Validators.required]
     },
     {
      validator: mustMatch("password", "confirm"),
     }
     );
     this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      // Faites quelque chose avec le token, par exemple l'afficher dans la console :
      console.log(this.token);
  });}

  reset()
  {
    if (this.ResetPasswordForm.invalid) {
      this.ResetPasswordForm.markAllAsTouched();
      return;
    }


   this.authService.resetPassword(this.token,this.ResetPasswordForm.value.password).subscribe(
    (exist: boolean) => {
      if (exist === true )
      {

          this.openConfirmationDialog();
        }

        else{
          this.erreur=true;
        setTimeout(() => {
          this.erreur = false;
        }, 3000);}

    },

   );

  }
  openConfirmationDialog() {

    this.showConfirmationDialog = true;
  }
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
    this.router.navigate(['']);
  }


}
