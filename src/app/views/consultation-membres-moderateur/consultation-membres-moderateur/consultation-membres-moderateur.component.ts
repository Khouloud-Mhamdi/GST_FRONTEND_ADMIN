import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-consultation-membres-moderateur',
  templateUrl: './consultation-membres-moderateur.component.html',
  styleUrls: ['./consultation-membres-moderateur.component.css']
})
export class ConsultationMembresModerateurComponent implements OnInit {
  public membres :any;
  public membresInitiaux :any;
  infoMembre = {
    id : 0 , 
    nom : '' , 
    prenom : '' , 
    email : '' , 
    naissance : '' , 
    adresse : '' , 
    telephone : '' , 
    dateInscrit : '' , 
    discipline : '' , 
  }
  query !:any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;
  nb_resultats: number | null = null;
  nb_membres: number | null = null;

  itemsPerPage: number = 5; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any; 

  objDiscipline = {
    id : 0 , 
    discipline : '' , 
  }
  constructor(private UserService :  UtilisateurService , public token : TokenStorageService , public inscriptionService : UtilisateurService) { }

  ngOnInit(): void {
    this.ListeDesMembres();
  }
  ListeDesMembres () : void {
    
    this.objDiscipline = this.token.getUser().discipline ; 
    console.log("la discipline du moderateur : " , this.objDiscipline.discipline ) ; 
    this.inscriptionService.consulterMembreParModerateur(this.objDiscipline.discipline).subscribe(
      (data)=>{
        console.log("les objets :" ,  data) ; 
        this.membres = data;
        this.nb_membres = this.membres.length;
        this.membresInitiaux=data;
        this.Pagination();
      }
    )
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

      this.ListeDesMembres();

      this.closeConfirmationDialog();

    })
  }


   search(query: any){
    console.log(this.query);
   
    this.UserService.RechercherMembreParModerateur(this.query , this.objDiscipline.discipline).subscribe(
      (data) => {
        console.log("Resultat de la recherche " , data) ; 
        this.membres = data;
        this.nb_resultats = this.membres.length;
        this.currentPage = 1;
        this.Pagination();
      }
    )
  }
  getData(id : number , nom : any , prenom : any , email : any , naissance : any , adresse : any , telephone : any , dateInscription : any , discipline : any ) {
    this.infoMembre.id = id ; 
    this.infoMembre.nom = nom ;
    this.infoMembre.prenom = prenom ; 
    this.infoMembre.email = email ; 
    this.infoMembre.naissance = naissance ; 
    this.infoMembre.adresse = adresse ; 
    this.infoMembre.telephone = telephone ; 
    this.infoMembre.dateInscrit = dateInscription ; 
    this.infoMembre.discipline = discipline ;     
  }
  
  
}
