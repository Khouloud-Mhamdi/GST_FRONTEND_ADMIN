import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-gestion-events',
  templateUrl: './gestion-events.component.html',
  styleUrls: ['./gestion-events.component.css']
})
export class GestionEventsComponent implements OnInit {
  public events : any ; 
  public eventsInitiaux  :any;
  valide = false ; 
  query !: any ; 
  dataEvent = {
    id : 0 , 
    titre : '' , 
    description : '' , 
    lieu : '' , 
    date : '' 
  }
  nb_events : any ; 
  nb_resultats : any ; 
  userFile : any   ;
  public imagePath : any ;
  imgURL: any;
  public message !: string;
  selectImg = true  ; 
  constructor(public eventService : EvenementService   , public formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.eventService.dataForm = this.formBuilder.group ({
      id : [''] , 
      titre : ['', [Validators.required]],
      lieu : ['', [Validators.required]],
      date: [''],
      description : ['', [Validators.required]],
    }) ; 
    this.getData(); 
  }
  getData() {
    this.eventService.getAll().subscribe(
      response =>{this.eventService.listData = response; this.events = response  ; this.eventsInitiaux = response } 
      
     );
   
  }
  removeData(id: number) {
   
    this.eventService.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error));
  
  }
  getDetails(id : number , titre : any , date : any ,  description : any   , lieu : any  )
  {
        
        this.dataEvent.titre = titre ; 
        this.dataEvent.lieu= lieu  ; 
        this.dataEvent.description = description; 
        this.dataEvent.date = date ; 
        this.dataEvent.id= id ; 
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
   
    updateData () {
      this.eventService.updatEvent(this.dataEvent).subscribe( data => {
        console.log("succée mayssa ! ") ; 
        
        }); ; 
    }

   /* search(query : any ){
      console.log(this.query);
      this.UserService.RechercherUtilisateur('GESTIONNAIRE',this.query).subscribe((data)=>{
        this.gestionnaires = data;
        this.nb_resultats= this.gestionnaires.length;
        this.Pagination();
      })
    }*/
    search (query : any ) {
      console.log (this.query) ; 
      this.eventService.RechercherEvenement(this.query).subscribe((data)=>{
      this.events = data ; 
      this.nb_resultats = this.events.length ; 
      })
    }
    onInputChange() {
    if (this.query === ''){
      this.events = this.eventsInitiaux ; 
      this.nb_resultats = null ; 
      this.getData() ; 
    }
    }
   /* onInputChange(): void {
      if (this.query === '') {
        this.gestionnaires = this.GestionnairesInitiaux;// Réinitialise la liste des utilisateurs lorsque le champ de recherche est vide
        this.Pagination();
  
        this.nb_resultats=null;
      }
    }*/
}
