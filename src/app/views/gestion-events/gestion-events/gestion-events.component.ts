import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { EvenementService } from 'src/app/services/evenement.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-gestion-events',
  templateUrl: './gestion-events.component.html',
  styleUrls: ['./gestion-events.component.css']
})
export class GestionEventsComponent implements OnInit {
  public evenements :any;
  public evenementsInitiaux :any;
  // mes variables
  public events : any ;
  public eventsInitiaux  :any;
  deleted = false ;
  modified = false ;
  erreurDelete = false ;
  modifiederreur = false ;
  valide = false ;
  query !: any ;
  dataEvent = {
    id : 0 ,
    titre : '' ,
    description : '' ,
    lieu : '' ,
    date : '', 
    heure : '', 
  }
  nb_events : any ;
  nb_resultats: number | null = null;
  userFile : any   ;
  public imagePath : any ;
  imgURL: any;
  public message !: string;
  selectImg = true  ;
  eventID : any ;
  showConfirmationDialog = false ;
  // mes variables

  supprimer=false;


  nb_evenements: number | null = null;
  itemsPerPage: number = 10; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedEvents: any;
  constructor(private titleService: Title ,public eventService : EvenementService   , public formBuilder : FormBuilder , private UserService :  UtilisateurService ) { }

  ngOnInit(): void {
    this.titleService.setTitle("GST-Liste des évènements")
    this.eventService.dataForm = this.formBuilder.group ({
      id : [''] ,
      titre : ['', [Validators.required]],
      lieu : ['', [Validators.required]],
      date: [''],
      description : ['', [Validators.required]],
    }) ;
   this.getData() ;
  }
  getData () : void {
    this.eventService.getAll().subscribe((data)=>{
    this.eventService.listData = data ;
     this.evenements = data;
     this.nb_evenements = this.evenements.length;
     this.evenementsInitiaux=data;
     this.Pagination();

   })
 }

  Pagination () : void {
   this.totalPages = Math.ceil(this.evenements.length / this.itemsPerPage);
   this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
   this.displayedEvents = this.getUsersForPage(this.currentPage);
  }
  getUsersForPage(page: number): any[] {
   // Calcul des utilisateurs à afficher pour la page donnée.
   const startIndex = (page - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.evenements.slice(startIndex, endIndex);
 }

 goToPage(page: number): void {
   // Changement de la page actuelle.
   this.currentPage = page;
   this.displayedEvents = this.getUsersForPage(page);
 }

 nextPage(): void {
   // Passage à la page suivante.
   if (this.currentPage < this.totalPages) {
     this.currentPage++;
     this.displayedEvents = this.getUsersForPage(this.currentPage);
   }
 }

 prevPage(): void {
   // Passage à la page précédente.
   if (this.currentPage > 1) {
     this.currentPage--;
     this.displayedEvents = this.getUsersForPage(this.currentPage);
   }
 }
 onInputChange(): void {
   if (this.query === '') {
     this.evenements = this.evenementsInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
     this.Pagination();

     this.nb_resultats=null;
   }
 }

 openConfirmationDialog(id : any) {
   this.eventID = id;
   this.showConfirmationDialog = true;
 }
 closeConfirmationDialog() {
   this.showConfirmationDialog = false;
 }

 getDetails(id : number , titre : any , date : any ,  description : any   , lieu : any , heure : any  )
  {

        this.dataEvent.titre = titre ;
        this.dataEvent.lieu= lieu  ;
        this.dataEvent.description = description;
        this.dataEvent.date = date ;
        this.dataEvent.id= id ;
        this.dataEvent.heure= heure ;
        console.log (this.dataEvent) ;


  }
  onSelectFile(event : any ) {
    this.selectImg = false ;
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;


    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();

    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


    }
 removeData() {

  this.eventService.deleteData(this.eventID)
    .subscribe(
      (data) => {
        console.log(data);
        this.getData();
        this.deleted = true ;
        setTimeout(() => {
          this.deleted= false;
        }, 3000);
      },
      (error) => {
        console.log(error) ;
        this.erreurDelete = true ;
        setTimeout(() => {
          this.erreurDelete= false;
        }, 3000);
      }
      );
      this.closeConfirmationDialog() ;

}

 updateData () {
  this.eventService.updatEvent(this.dataEvent).subscribe( (data) => {
    console.log("succée mayssa ! ") ;
    this.modified = true ;
    setTimeout(() => {
      this.modified= false;
    }, 3000);
    this.getData() ;
    } ,

    (error) => {
      this.modifiederreur = true ;
      console.log(error) ;
      setTimeout(() => {
        this.modifiederreur= false;
      }, 3000);
    }

    );
}
  search(query: any){
   console.log(this.query);
   this.eventService.RechercherEvenement(this.query).subscribe(
    (data)=>{
      this.evenements = data;
      this.nb_resultats= this.evenements.length;
      this.currentPage = 1;
      this.Pagination();
    }
   )
 }

}
