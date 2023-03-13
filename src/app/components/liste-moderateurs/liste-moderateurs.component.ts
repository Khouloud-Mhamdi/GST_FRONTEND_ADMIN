import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-liste-moderateurs',
  templateUrl: './liste-moderateurs.component.html',
  styleUrls: ['./liste-moderateurs.component.css']
})
export class ListeModerateursComponent implements OnInit {

  public moderateurs :any;
  public modérateursInitiaux :any;
  visibleItems = 2;
  conteur=0;
  query :any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;

  constructor( private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.UserService.ListeAvecDisciplines('modérateur').subscribe((data)=>{
      this.moderateurs = data;
      this.modérateursInitiaux=data;
      this.moderateurs.slice(this.conteur , this.visibleItems);

    })
  }
  onInputChange(): void {
    if (this.query === '') {
      this.moderateurs = this.modérateursInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.moderateurs.slice(this.conteur , this.visibleItems);
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


      this.UserService.ListeDesUtilisateurs('modérateur').subscribe((data)=>{
        this.moderateurs = data;
        this.modérateursInitiaux=data;
        this.moderateurs.slice(this.conteur , this.visibleItems);

      })
      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('modérateur',this.query).subscribe((data)=>{
      this.moderateurs = data;

      this.modérateursInitiaux.slice(this.conteur , this.visibleItems);


    })
  }

}
