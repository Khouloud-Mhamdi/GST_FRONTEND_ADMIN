import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-confirmer-inscription',
  templateUrl: './confirmer-inscription.component.html',
  styleUrls: ['./confirmer-inscription.component.css']
})
export class ConfirmerInscriptionComponent implements OnInit {

  public membres :any;
  public membresInitiaux :any;

  query !:any;
  supprimer=false;
  showConfirmationDialog = false;
  inscriID :any;
  email : any;
  nb_resultats: number | null = null;
  nb_membres: number | null = null;

  itemsPerPage: number = 5; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any;

  constructor(private UserService :  UtilisateurService) { }

  ngOnInit(): void {
    this.ListeDesUtilisateurs();
  }
  ListeDesUtilisateurs () : void {
    this.UserService.DemandeInscriptions().subscribe((data)=>{
      this.membres = data;
      console.log(this.membres);
      this.nb_membres = this.membres.length;
      this.membresInitiaux=data;
      this.Pagination();


    })
  }

   Pagination () : void {
    this.totalPages = Math.ceil(this.membres.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.displayedUsers = this.getUsersForPage(this.currentPage);
   }

    getUsersForPage(page: number): any[] {
    // Calcul des utilisateurs à afficher pour la page donnée.
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.membres.slice(startIndex, endIndex);
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
      this.membres = this.membresInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
      

      this.Pagination();
    }
  }



  openConfirmationDialog(id : any , mail : any) {
    this.inscriID = id;
    this.email=mail;
    this.showConfirmationDialog = true;
  }
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
  }


  deleteInscription(){

    this.showConfirmationDialog = true;
    this.UserService.EnvoyerEmailRefus(this.email).subscribe((data)=>
    {

    })

    this.UserService.SupprimerInscription(this.inscriID).subscribe((data)=>{
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
    this.UserService.RechercheInscriptions(this.query).subscribe((data)=>{
      this.membres = data;
      console.log(this.query);
      console.log(data);
      this.nb_resultats = this.membres.length;

      this.Pagination();

    })
  }

}
