import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-liste-gestionnaires',
  templateUrl: './liste-gestionnaires.component.html',
  styleUrls: ['./liste-gestionnaires.component.css']
})
export class ListeGestionnairesComponent implements OnInit {
  public gestionnaires :any;
  public GestionnairesInitiaux :any;
  visibleItems = 2;
  conteur=0;
  query :any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;

  constructor( private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.UserService.ListeDesUtilisateurs('gestionnaire').subscribe((data)=>{
      this.gestionnaires = data;
      this.GestionnairesInitiaux=data;
      this.gestionnaires.slice(this.conteur , this.visibleItems);

    })
  }
  onInputChange(): void {
    if (this.query === '') {
      this.gestionnaires = this.GestionnairesInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.gestionnaires.slice(this.conteur , this.visibleItems);
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


      this.UserService.ListeDesUtilisateurs('gestionnaire').subscribe((data)=>{
        this.gestionnaires = data;
        this.GestionnairesInitiaux=data;
        this.gestionnaires.slice(this.conteur , this.visibleItems);

      })
      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('gestionnaire',this.query).subscribe((data)=>{
      this.gestionnaires = data;

      this.GestionnairesInitiaux.slice(this.conteur , this.visibleItems);


    })
  }


}
