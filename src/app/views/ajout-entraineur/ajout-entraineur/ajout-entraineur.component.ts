import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DisciplineService } from 'src/app/services/discipline.service';
import { EntraineurService } from 'src/app/services/entraineur.service';

@Component({
  selector: 'app-ajout-entraineur',
  templateUrl: './ajout-entraineur.component.html',
  styleUrls: ['./ajout-entraineur.component.css']
})
export class AjoutEntraineurComponent implements OnInit {
  addUserForm !: FormGroup <any> ;
  public clubs : any = [] ;
  showDisciplines = false ;
  FormGroup: any;
  ajout = false ;
  erreur = false ;
  invalid=false;
  showConfirmationDialog = false ;
  valid=false;
  pass = true ; 
  emailExistence :any;
  entraineur = {
    nom : '' , 
    prenom : '' , 
    email : '' , 
    adresse : '' , 
    telephone : '' , 
    naissance : '' , 
  }


  constructor(private authService : AuthService, private entraineurService : EntraineurService , private disciplineService : DisciplineService , private formBuilder :FormBuilder ) {
   
   }

  ngOnInit(): void {
    this.addUserForm= this.formBuilder.group({
      nom : ["", [Validators.required, Validators.minLength(3)]],
      prenom : ["", [Validators.required , Validators.minLength(3)]],
      email : ["", [Validators.email,Validators.required]],
      adresse : ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
      telephone : ["", [Validators.required]],
      naissance : ["", [Validators.required]] ,
      id_discipline :  ["" , [Validators.required]] , 
     }
     );
  this.getAllclubs() ; 
     
   
  }
  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.clubs = data ;
    })
  }



  test(){
    
    console.log("this is a selected date" ,this.addUserForm.value); 
    console.log("this is the selected id_discipline " , this.addUserForm.value.id_discipline )  ; 
    this.entraineur.nom = this.addUserForm.value.nom ; 
    this.entraineur.prenom = this.addUserForm.value.prenom ; 
    this.entraineur.email = this.addUserForm.value.email ; 
    this.entraineur.adresse = this.addUserForm.value.adresse ; 
    this.entraineur.telephone = this.addUserForm.value.telephone ; 
    this.entraineur.naissance = this.addUserForm.value.naissance ; 
    console.log ("this is entraineur " , this.entraineur) ; 
    this.entraineurService.addentraineur(this.entraineur , this.addUserForm.value.id_discipline  ).subscribe(
      (data) => {

        console.log(data);
        this.addUserForm.reset() ; 
      },
      (err) => {
        console.log("here error from BE", err);
      }
    ); 
    this.closeConfirmationDialog() ; 
  }

  addUser(){
    console.log ("hello 0 ") ; 
    if((!this.controleSaisieNom())||(!this.controleSaisiePrénom())||(!this.controleSaisieTelephone())||(!this.controleSaisieEmail()))
    {this.valid=true;
      console.log(this.valid);
      setTimeout(() => {
        this.valid = false;
      }, 3000);
   console.log ("hello 1 ");
  }
    else{
      this.entraineurService.ExistEmail(this.addUserForm.value.email).subscribe(
        (exist:boolean) => {
          if (exist === true )
          {this.erreur=true;
           this.pass = false ; 
            setTimeout(() => {
              this.erreur = false;
            }, 4000);}
          }

      )
    console.log ("hello 2 ");
    console.log ("la valeur de pass" , this.pass) ; 
    if (this.pass == true ) {
    console.log("this is a selected date" ,this.addUserForm.value); 
    console.log("this is the selected id_discipline " , this.addUserForm.value.id_discipline )  ; 
    this.entraineur.nom = this.addUserForm.value.nom ; 
    this.entraineur.prenom = this.addUserForm.value.prenom ; 
    this.entraineur.email = this.addUserForm.value.email ; 
    this.entraineur.adresse = this.addUserForm.value.adresse ; 
    this.entraineur.telephone = this.addUserForm.value.telephone ; 
    this.entraineur.naissance = this.addUserForm.value.naissance ; 
    console.log ("this is entraineur " , this.entraineur) ; 
    this.entraineurService.addentraineur(this.entraineur , this.addUserForm.value.id_discipline  ).subscribe(
      (data) => {
        this.ajout=true;
        setTimeout(() => {
          this.ajout = false;
        }, 3000); // 3000 ms = 3 secondes
        console.log(data);
        this.addUserForm.reset() ; 
       
      },
      (err) => {
        console.log("here error from BE", err);
        this.emailExistence=err; 
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
        
       
      }
    ); 
    }
   
  }
  this.closeConfirmationDialog();  
  }

  

  controleSaisieTelephone(): boolean {
    const telephoneInput = document.getElementById("telephone") as HTMLInputElement;

    if (!/^\d{8}$/.test(this.addUserForm.value.téléphone )) {
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
    const regex =/^[a-zA-Z]{3,}$/ ;
    if (!regex.test(this.addUserForm.value.nom)) {
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
    const regex =/^[a-zA-Z]{3,}$/ ;
    if (!regex.test(this.addUserForm.value.prénom)) {
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
