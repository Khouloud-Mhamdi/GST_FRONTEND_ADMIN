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
  
  query !:any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;
  nb_resultats: number | null = null;
  nb_adherents: number | null = null;

  itemsPerPage: number = 2; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any; 

  constructor( private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
      this.adherents = data;
      this.nb_adherents = this.adherents.length;
      this.adherentsInitiaux=data;

      this.totalPages = Math.ceil(this.adherents.length / this.itemsPerPage);
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
      this.displayedUsers = this.getUsersForPage(this.currentPage);
    

    })
  }
  getUsersForPage(page: number): any[] {
    // Calcul des utilisateurs à afficher pour la page donnée.
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.adherents.slice(startIndex, endIndex);
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
      this.adherents = this.adherentsInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      this.totalPages = Math.ceil(this.adherents.length / this.itemsPerPage);
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
      this.displayedUsers = this.getUsersForPage(this.currentPage);
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


      this.UserService.ListeDesUtilisateurs('adhérent').subscribe((data)=>{
        this.adherents = data;
        this.adherentsInitiaux=data;
        this.totalPages = Math.ceil(this.adherents.length / this.itemsPerPage);
        this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
        this.displayedUsers = this.getUsersForPage(this.currentPage);

      })
      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
    this.UserService.RechercherUtilisateur('adhérent',this.query).subscribe((data)=>{
      this.adherents = data;
      this.nb_resultats = this.adherents.length;
      
      this.totalPages = Math.ceil(this.adherents.length / this.itemsPerPage);
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
      this.displayedUsers = this.getUsersForPage(this.currentPage);

     


    })
  }



}
