import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { DisciplineService } from 'src/app/services/discipline.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm !: FormGroup <any> ;
  public clubs : any ;
  showDisciplines = false ;
  FormGroup: any;
  ajout = false ;
  erreur = false ;
  invalid=false;
  showConfirmationDialog = false ;
  valid=false;

  emailExistence :any;

  constructor(private titleService: Title , private authService : AuthService , private disciplineService : DisciplineService , private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm= this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName : ["", [Validators.required , Validators.minLength(3)]],
      email : ["", [Validators.email,Validators.required]],
      adresse : ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
      telephone : ["", [Validators.required]],
      role : ["", [Validators.required]] ,
      id_discipline : ["", [Validators.required]]
     }
     );
     this.getAllclubs();
     this.titleService.setTitle('GSTAdmin-Ajouter Utilisateur ');

    console.log("data here : " , this.clubs ) ;

  }

  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.clubs = data ;
    })
  }

  addUser(){
    if((!this.controleSaisieNom())||(!this.controleSaisiePrénom())||(!this.controleSaisieTelephone())||(!this.controleSaisieEmail()))
    {this.valid=true;
      console.log(this.valid);
      setTimeout(() => {
        this.valid = false;
      }, 3000);

  }
    else{
      this.authService.ExistEmail(this.addUserForm.value.email).subscribe(
        (exist:boolean) => {
          if (exist === true )
          {this.erreur=true;

            setTimeout(() => {
              this.erreur = false;
            }, 4000);}
          }

      )

    console.log(this.addUserForm.value);
    this.authService.addNewUser(this.addUserForm.value).subscribe(
      (data) => {

        console.log(data);
        this.ajout=true;
        this.addUserForm.reset() ; 
        setTimeout(() => {
          this.ajout = false;
        }, 3000); // 3000 ms = 3 secondes
      },
      (err) => {
        console.log("here error from BE", err);
        this.emailExistence=err;

        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      }

    );}
    this.closeConfirmationDialog();
  }

  // event of role selection
 onRoleChange() {
    console.log("hello", this.showDisciplines)
    const selectedRole = this.addUserForm?.get('role')?.value;
    if (selectedRole !== undefined && selectedRole === 'moderateur') {
      this.showDisciplines = true;
    } else {
      this.showDisciplines = false;
    }
  }


  controleSaisieTelephone(): boolean {
    const telephoneInput = document.getElementById("telephone") as HTMLInputElement;

    if (!/^\d{8}$/.test(this.addUserForm.value.telephone)) {
      telephoneInput.classList.add("invalid");
      return false;
    } else {
      telephoneInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisieNom(): boolean {

    const nomInput = document.getElementById("firstname") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[a-zA-Z\s]{3,}$/ ;
    if (!regex.test(this.addUserForm.value.firstName)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisiePrénom(): boolean {

    const nomInput = document.getElementById("lastname") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[a-zA-Z\s]{3,}$/ ;
    if (!regex.test(this.addUserForm.value.lastName)) {
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
    if (!regex.test(this.addUserForm.value.email)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }


  openConfirmationDialog(){
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }



}
