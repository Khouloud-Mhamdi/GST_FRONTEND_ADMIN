import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { mustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  PasswordForm !:  FormGroup <any>;
  currentUser: any;
  user : any = {};
  showConfirmationDialog = false ;
  update = false ;
  faute = false ;
  erreur = false ;
  valid=false;
  emailInvalid = false;
  changerPassword=false;
  updatedPassword=false;
  addUserForm !: FormGroup <any> ;
  FormGroup: any;
  long:any;
  Password ={
    email: String,
    password: String
  }
  constructor(private titleService: Title ,private token: TokenStorageService , private authService : AuthService , private router : Router,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle("GSTAdmin-Profil");

    this.PasswordForm= this.formBuilder.group({

      OldPassword : ["", [Validators.required]],
      NewPassword :["", [Validators.required ,Validators.minLength(5)]],
      ConfirmPassword : ["", [Validators.required]]
     },
     {
      validator: mustMatch("NewPassword", "ConfirmPassword"),
     }
     );
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id);
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data; console.log(data); } );

    this.user.id = this.currentUser.id ;

  }
  EditCurrentUser() {
    if ((!this.controleSaisieNom()) || (!this.controleSaisiePrénom()) || (!this.controleSaisieEmail())|| (!this.controleSaisieTelephone())) {
      // Handle input errors
      this.valid = true;
      this.showConfirmationDialog = false;
      setTimeout(() => {
        this.valid = false;
      }, 10000);
    } else {
      // Check if email exists
      if (this.user.email !== this.currentUser.email) {
        this.authService.ExistEmail(this.user.email).subscribe((exist: boolean) => {
          if (exist === true) {
            // Handle email already exists error
            console.log("valeur ", exist)
            this.showConfirmationDialog = false;
            this.erreur = true;
            setTimeout(() => {

              this.erreur = false;

            }, 10000);
          } else {
            // Update user
            this.showConfirmationDialog = false;
            this.authService.updateUser(this.user).subscribe(
              (data) => {
                console.log('here updated user: ', data);
                this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {
                  this.user = data;
                });
                this.update = true;
                setTimeout(() => {
                  this.update = false;
                }, 10000); // 3000 ms = 3 secondes
              },
              (err) => {
                console.log('probleme !!! ', err);
                this.erreur = true;
                setTimeout(() => {
                  this.erreur = false;
                }, 10000); // 3000 ms = 3 secondes
              }
            );

            // Update currentUser information and save to token
            this.currentUser.firstName = this.user.nom;
            this.currentUser.lastName = this.user.prenom;
            this.currentUser.email = this.user.email;
            this.token.saveUser(this.currentUser);
            this.closeConfirmationDialog();
          }
        });
      } else {
        // Update user
        this.showConfirmationDialog = false;
        this.authService.updateUser(this.user).subscribe(
          (data) => {
            console.log('here updated user: ', data);
            this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {
              this.user = data;
            });
            this.update = true;
            setTimeout(() => {
              this.update = false;
            }, 10000); // 3000 ms = 3 secondes
          },
          (err) => {
            console.log('probleme !!! ', err);
            this.erreur = true;
            setTimeout(() => {
              this.erreur = false;
            }, 10000); // 3000 ms = 3 secondes
          }
        );

        // Update currentUser information and save to token
        this.currentUser.firstName = this.user.nom;
        this.currentUser.lastName = this.user.prenom;
        this.token.saveUser(this.currentUser);
        this.closeConfirmationDialog();
      }
    }
  }
   controleSaisieNom(): boolean {

    const nomInput = document.getElementById("firstName") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[a-zA-Z\s]{3,}$/ ;
    if (!regex.test(this.user.nom)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisiePrénom(): boolean {

    const nomInput = document.getElementById("lastName") as HTMLInputElement;

    const regex =/^[a-zA-Z\s]{3,}$/ ;
    if (!regex.test(this.user.prenom)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisieEmail(): boolean {

    const nomInput = document.getElementById("email") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ;
    if (!regex.test(this.user.email)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }}
    controleSaisieTelephone(): boolean {
      const telephoneInput = document.getElementById("telephone") as HTMLInputElement;

      if (!/^\d{8}$/.test(this.user.telephone)) {
        telephoneInput.classList.add("invalid");
        return false;
      } else {
        telephoneInput.classList.remove("invalid");
        return true;
      }
    }
   closeConfirmationDialog(){
    this.showConfirmationDialog = false;
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;});
   }
   openConfirmationDialog(){
    this.showConfirmationDialog = true;
   }
   changePassword()
   {


}

UpdatePasswordUser()
{

    this.Password.email=this.user.email;
    this.Password.password=this.PasswordForm.value.OldPassword;
    this.long=this.PasswordForm.value.NewPassword.length;
    console.log(this.long)
   if(!this.PasswordForm.value.NewPassword || !this.PasswordForm.value.OldPassword ||!(this.PasswordForm.value.NewPassword===this.PasswordForm.value.ConfirmPassword)||!(this.long>4))
 {this.faute = true;
            setTimeout(() => {
              this.faute= false;
            }, 10000);
 }
  else
  {
    this.authService.ModifierPassword(this.Password).subscribe(
      (authenticated: boolean) => {
        if (authenticated) {
          console.log('Utilisateur authentifié');

          this.authService.changerMotDePasse(this.user.id,this.PasswordForm.value.NewPassword).subscribe(
            (exist: boolean) => {
              if (exist)
              {
                this.updatedPassword=true;
                setTimeout(() => {
                  this.updatedPassword = false;
                }, 10000);

                } else {

                  this.changerPassword=true;
                  console.log(this.changerPassword);
                    setTimeout(() => {
                      this.changerPassword = false;
                    }, 10000);
                }
       },
          )
        }
      },
      (error) => {
        console.error('Erreur lors de l\'authentification', error);
        this.changerPassword=true;

                    setTimeout(() => {
                      this.changerPassword = false;
                    }, 10000);
      }
    );
  }
}
}

