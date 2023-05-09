import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DisciplineService } from 'src/app/services/discipline.service';
import { EntraineurService } from 'src/app/services/entraineur.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-gestion-entraineurs',
  templateUrl: './gestion-entraineurs.component.html',
  styleUrls: ['./gestion-entraineurs.component.css']
})
export class GestionEntraineursComponent implements OnInit {
  disForm !:  FormGroup;  
  public clubs : any ; 
  public entraineurs :any;
  public entraineursInitiaux :any;
  public modified = false ; 
  public modifiederreur = false ; 
  

  NomDiscipline : any ; 
  IdDiscipline : any ; 

  query :any;
  supprimer=false;
  showConfirmationDialog = false;
  userID :any;
  nb_resultats: number | null = null;
  nb_entraineurs: number | null = null;
  itemsPerPage: number = 5; // Nombre d'utilisateurs à afficher par page.
  totalPages: number = 1; // Nombre total de pages.
  currentPage: number = 1; // Page actuelle.
  pages: number[] = []; // Tableau des numéros de page.
  displayedUsers: any;
  dataEntraineur = {
    id : 0 , 
    nom : '' , 
    prenom : '' , 
    naissance : '' , 
    email : '' , 
    telephone : '' , 
    adresse : '' ,
    dateEmbauche : ''  , 
    
  }
  infoEntraineur = {
  
    nom : '' , 
    prenom : '' , 
    naissance : '' , 
    email : '' , 
    telephone : '' , 
    adresse : '' , 
    discipline : '' , 
    dateEmbauche : '', 
  }
  objDiscipline = {
    id : 0 , 
    discipline : '' , 
  }
  constructor(private titleService: Title ,private UserService :  UtilisateurService , private entraineurService : EntraineurService , public disciplineService : DisciplineService  , private formBuilder : FormBuilder , private token : TokenStorageService) { }
  
  ngOnInit(): void {
  this.titleService.setTitle("Liste des entraineurs")
    this.disForm= this.formBuilder.group({
      
      id_discipline : ["", [Validators.required]]
     }
     );
    this.objDiscipline = this.token.getUser().discipline ; 
    this.ListeDesUtilisateurs();
    this.getAllclubs () ; 
  }
  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.clubs = data ;
    })
  }
 
  ListeDesUtilisateurs () : void {
    this.entraineurService.listerEntraineurs(this.objDiscipline.discipline).subscribe((data)=>{
      this.entraineurs = data;
      console.log("here data : " , this.entraineurs) ; 
      this.nb_entraineurs = this.entraineurs.length;
      this.entraineursInitiaux=data;
      this.Pagination();
   
    })
  }

   Pagination () : void {
    this.totalPages = Math.ceil(this.entraineurs.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.displayedUsers = this.getUsersForPage(this.currentPage);
   }
   getUsersForPage(page: number): any[] {
    // Calcul des utilisateurs à afficher pour la page donnée.
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.entraineurs.slice(startIndex, endIndex);
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
      this.entraineurs = this.entraineursInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
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
    this.entraineurService.deleteEntraineurById(this.userID).subscribe(
      (data)=>{
        this.supprimer = true ; 
        setTimeout(() => {
          this.supprimer = false;
        }, 3000); // 3000 ms = 3 secondes
        this.ListeDesUtilisateurs();
        this.closeConfirmationDialog() ; 
      }
     
    )
  }


   search(query: any){
  
    console.log(this.query) ; 
    this.entraineurService.RechercherEntraineur(this.query , this.objDiscipline.discipline).subscribe((data)=>{
      this.entraineurs = data;
      this.nb_resultats= this.entraineurs.length;
      this.currentPage = 1;
      this.Pagination();
    })
    
    }

 // getDetails(a.nom , a.prenom , a.naissance , a.email , a.telephone , a.adresse , a.discipline.discipline)
   getDetailsForUpdate (id : number , nom : any , prenom : any , naissance : any , email : any , telephone : any , adresse : any , nomDis : any , idDis : any , dateEmbauche : any  ) {
  this.dataEntraineur.id = id ; 
  this.dataEntraineur.nom = nom ; 
  this.dataEntraineur.prenom = prenom ; 
  this.dataEntraineur.naissance = naissance ; 
  this.dataEntraineur.email = email ; 
  this.dataEntraineur.telephone = telephone ; 
  this.dataEntraineur.adresse = adresse ; 
  this.dataEntraineur.dateEmbauche = dateEmbauche ; 
  this.NomDiscipline = nomDis ; 
  this.IdDiscipline = idDis ; 
  
   }
   getDetails(id : number , nom : any , prenom : any , naissance : any , email : any , telephone : any , adresse : any , discipline : any , dateEmbauche : any )
   {
      this.infoEntraineur.nom = nom ; 
      this.infoEntraineur.prenom = prenom ; 
      this.infoEntraineur.naissance = naissance ; 
      this.infoEntraineur.email = email ; 
      this.infoEntraineur.telephone = telephone ; 
      this.infoEntraineur.adresse = adresse ; 
      this.infoEntraineur.discipline = discipline ; 
      this.infoEntraineur.dateEmbauche = dateEmbauche ; 

   }
   
   updateEntraineur() {
      this.entraineurService.updateEntraineur(this.dataEntraineur ).subscribe(
        (data)=>{
         this.modified = true ; 
         setTimeout(() => {
          this.modified= false;
        }, 3000);
        this.ListeDesUtilisateurs();
        } , 
        (err) => {
          this.modifiederreur = true ; 
          console.log(err) ; 
          setTimeout(() => {
            this.modifiederreur= false;
          }, 3000);
        }
      )
       }
}
