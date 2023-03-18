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
  
  query :any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;
  nb_resultats: number | null = null;
  nb_moderateurs: number | null = null;
  itemsPerPage: number = 2; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any; 

  constructor( private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.ListeDesUtilisateurs();
    
  }
  ListeDesUtilisateurs () : void {
    this.UserService.ListeDesUtilisateurs('modérateur').subscribe((data)=>{
      this.moderateurs = data;
      this.nb_moderateurs = this.moderateurs.length;
      this.modérateursInitiaux=data;
      this.Pagination();
   
    })
  }

   Pagination () : void {
    this.totalPages = Math.ceil(this.moderateurs.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.displayedUsers = this.getUsersForPage(this.currentPage);
   }
   getUsersForPage(page: number): any[] {
    // Calcul des utilisateurs à afficher pour la page donnée.
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.moderateurs.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    // Changement de la page actuelle.
    this.currentPage = page;
    this.displayedUsers = this.getUsersForPage(page);
  }

  nextPage(): void {
    // Passage à la page suivante.
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayedUsers = this.getUsersForPage(this.currentPage);
    }
  }

  prevPage(): void {
    // Passage à la page précédente.
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayedUsers = this.getUsersForPage(this.currentPage);
    }
  }
  onInputChange(): void {
    if (this.query === '') {
      this.moderateurs = this.modérateursInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.Pagination();
      this.nb_resultats=null;
    }
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

      this.ListeDesUtilisateurs();
      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('modérateur',this.query).subscribe((data)=>{
      this.moderateurs = data;
      this.nb_resultats= this.moderateurs.length;
      this.Pagination();


    })
  }

}
