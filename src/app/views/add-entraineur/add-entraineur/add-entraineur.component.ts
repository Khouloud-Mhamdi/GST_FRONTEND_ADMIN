import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { DisciplineService } from 'src/app/services/discipline.service';
import { EntraineurService } from 'src/app/services/entraineur.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-entraineur',
  templateUrl: './add-entraineur.component.html',
  styleUrls: ['./add-entraineur.component.css']
})
export class AddEntraineurComponent implements OnInit {
  EntraineurForm !: FormGroup <any> ;
  public clubs : any ;
  showDisciplines = false ;
  FormGroup: any;
  ajout = false ;
  erreur = false ;
  invalid=false;
  showConfirmationDialog = false ;
  valid=false;

  emailExistence :any;
  objDiscipline = {
    id : 0 ,
    discipline : '' ,
  }
  // variables :

  pass = true ;
  entraineur = {
    nom : '' ,
    prenom : '' ,
    email : '' ,
    adresse : '' ,
    telephone : '' ,
    naissance : '' ,
    dateEmbauche: '' ,
  }



  constructor(private titleService: Title ,private authService : AuthService, private entraineurService : EntraineurService , private disciplineService : DisciplineService , private formBuilder :FormBuilder , private token : TokenStorageService ) {

   }

  ngOnInit(): void {
    this.titleService.setTitle("GSTAdmin-Ajouter Entraineur");

    this.EntraineurForm = this.formBuilder.group({
      nom : ["", [Validators.required, Validators.minLength(3)]],
      prenom : ["", [Validators.required , Validators.minLength(3)]],
      email : ["", [Validators.email,Validators.required]],
      adresse : ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(100)]],
      telephone : ["", [Validators.required]],
      naissance : ["", [Validators.required]] ,
      dateEmbauche: ["", [Validators.required]],


     }
     );
     this.getAllclubs();
     this.objDiscipline = this.token.getUser().discipline ;

    console.log("data here : " , this.clubs ) ;
  }
  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.clubs = data ;
    })
  }

  addUser(){
    this.pass = true ;
    console.log ("hello 0 ") ;
    if((!this.controleSaisieNom())||(!this.controleSaisiePrénom())||(!this.controleSaisieTelephone())||(!this.controleSaisieEmail()))
    {this.valid=true;
      this.showConfirmationDialog = false;
      console.log(this.valid);
      setTimeout(() => {
        this.valid = false;
      }, 5000);
   console.log ("hello 1 ");
  }
    else{
      this.entraineurService.ExistEmail(this.EntraineurForm.value.email).subscribe(
        (exist:boolean) => {
          if (exist === true )
          {this.erreur=true;
          this.showConfirmationDialog = false;
           this.pass = false ;
           console.log("debut else " , this.pass) ;
            setTimeout(() => {
              this.erreur = false;
            }, 5000);}
          }

      )

    if (this.pass === true ) {
    console.log ("dans if " , this.pass) ;
    console.log("this is a selected date" ,this.EntraineurForm.value);
    console.log("this is the selected id_discipline " , this.EntraineurForm.value.id_discipline )  ;
    this.entraineur.nom = this.EntraineurForm.value.nom ;
    this.entraineur.prenom = this.EntraineurForm.value.prenom ;
    this.entraineur.email = this.EntraineurForm.value.email ;
    this.entraineur.adresse = this.EntraineurForm.value.adresse ;
    this.entraineur.telephone = this.EntraineurForm.value.telephone ;
    this.entraineur.naissance = this.EntraineurForm.value.naissance ;
    this.entraineur.dateEmbauche = this.EntraineurForm.value.dateEmbauche ;

    this.objDiscipline = this.token.getUser().discipline ;

    this.entraineurService.addentraineur(this.entraineur , this.objDiscipline.id ).subscribe(
      (data) => {
        this.ajout=true;
        this.showConfirmationDialog = false;
        setTimeout(() => {
          this.ajout = false;
        }, 10000); // 3000 ms = 3 secondes
        console.log(data);
        this.EntraineurForm.reset() ;

      },
      (err) => {
        console.log("here error from BE", err);
        this.emailExistence=err;
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 5000); // 3000 ms = 3 secondes


      }
    );
    }

  }
  this.closeConfirmationDialog();
  }
  controleSaisieTelephone(): boolean {
    const telephoneInput = document.getElementById("telephone") as HTMLInputElement;

    if (!/^\d{8}$/.test(this.EntraineurForm .value.telephone)) {
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
    if (!regex.test(this.EntraineurForm .value.nom)) {
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
    if (!regex.test(this.EntraineurForm .value.prenom)) {
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
    if (!regex.test(this.EntraineurForm .value.email)) {
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
