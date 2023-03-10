import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';


@Component({
  selector: 'app-liste-adherent',
  templateUrl: './liste-adherent.component.html',
  styleUrls: ['./liste-adherent.component.css']
})
export class ListeAdherentComponent implements OnInit {
  [x: string]: any;
  public adherents :any;
  public adherentsInitiaux :any;
  visibleItems = 2;
  conteur=0;
  query !:any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;
  constructor( private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
      this.adherents = data;
      this.adherentsInitiaux=data;
      this.adherents.slice(this.conteur , this.visibleItems);

    })
  }

  onInputChange(): void {
    if (this.query === '') {
      this.adherents = this.adherentsInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.adherents.slice(this.conteur , this.visibleItems);
    }
  }

  VoirSuivant() {
    this.visibleItems += 2;
    this.conteur +=2;



  }
  VoirPrecedent() {
    this.visibleItems -= 2;
    this.conteur -=2;
  }

  openConfirmationDialog(id : any) {
    this.userID = id;
    this.showConfirmationDialog = true;
  }
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
  }






  deleteUser(){

    this.showConfirmationDialog = true;

    this.UserService.SupprimerUtilisateur(this.userID).subscribe((data)=>{
      this.supprimer=true;
      setTimeout(() => {
        this.supprimer = false;
      }, 3000); // 3000 ms = 3 secondes


      this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
        this.adherents = data;
        this.adherentsInitiaux=data;
        this.adherents.slice(this.conteur , this.visibleItems);

      })
      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('adhérent',this.query).subscribe((data)=>{
      this.adherents = data;

      this.adherents.slice(this.conteur , this.visibleItems);


    })
  }



}
