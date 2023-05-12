import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.css']
})
export class ListeMembresComponent implements OnInit {

  public membres :any;
  public membresInitiaux :any;

  query !:any;
  supprimer=false;

  showConfirmationDialog = false;
  showConfirmationDialogValidation = false;
  inscriID :any;
  email : any;
  membreID : any ;
  nb_resultats: number | null = null;
  nb_membres: number | null = null;

  itemsPerPage: number = 10; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any;
  membreDetails = {
    id_inscription : 0 ,
    nom : '' ,
    prenom : '' ,
    date_naissance : '' ,
    lieu_naissance : '' ,
    email : '' ,
    telephone : '' ,
    adresse : '' ,
    discipline : '' ,
    date_inscription : '' ,
    mode_paiement : '' ,
    stegiste : '' ,
    matricule: '' ,
    relation : '' ,
    NomAdherent : '' ,
    PrenomAdherent : '' ,
    Profession : '' ,

  }

  constructor(private titleService: Title ,private InscriptionService :  InscriptionService) { }

  ngOnInit(): void {
    this.titleService.setTitle("GSTAdmin-Liste des membres");
    this.ListeDesUtilisateurs();
  }
  ListeDesUtilisateurs () : void {
    this.InscriptionService.ListeDesMembres().subscribe((data)=>{
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
      this.nb_resultats=null;

      this.Pagination();
    }
  }



  openConfirmationDialog(id : any , mail : any , idM:any) {
    this.inscriID = id;
    this.email=mail;
    this.membreID=idM;
    this.showConfirmationDialog = true;
  }
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
  }


  deleteInscription(){

    this.showConfirmationDialog = true;
    this.InscriptionService.EmailSuppressionMembre(this.email).subscribe((data)=>
    {

    })
    if(this.membreID!==null)
    {this.InscriptionService.SupprimerMembre(this.membreID).subscribe((data)=>
      {

      })   }

    this.InscriptionService.SupprimerInscription(this.inscriID).subscribe((data)=>{
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
    this.InscriptionService.RechercherMembres(this.query).subscribe((data)=>{
      this.membres = data;
      console.log(this.query);
      console.log(data);
      this.nb_resultats = this.membres.length;
      this.currentPage = 1;

      this.Pagination();

    })
  }

  getDetails(id : number , nom : any , prenom : any ,  email : any , telephone : any , adresse : any , date_naissance : any , lieu_naissance:any , discipline : any ,  profession:any , date_inscription:any ,  mode_paiement:any , stegiste:any ,  relation :any, NomAdherent:any , PrenomAdherent:any)
   {
     this.membreDetails.id_inscription = id ;
      this.membreDetails.nom = nom ;
      this.membreDetails.prenom = prenom ;
      this.membreDetails.date_naissance = date_naissance ;
      this.membreDetails.lieu_naissance = lieu_naissance ;
      this.membreDetails.email = email ;
      this.membreDetails.telephone = telephone ;
      this.membreDetails.adresse = adresse ;
      this.membreDetails.discipline = discipline ;
      this.membreDetails.Profession= profession;
      this.membreDetails.NomAdherent= NomAdherent;
      this.membreDetails.PrenomAdherent= PrenomAdherent;
      this.membreDetails.relation=relation;

      this.membreDetails.stegiste=stegiste;
      this.membreDetails.date_inscription = date_inscription ;
      this.membreDetails.mode_paiement= mode_paiement;

   }


}
