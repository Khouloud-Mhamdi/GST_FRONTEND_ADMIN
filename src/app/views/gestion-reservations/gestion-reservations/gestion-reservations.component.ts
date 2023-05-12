import { Component, OnInit } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction'; // import the interaction plugin
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import { CalendarOptions } from '@fullcalendar/core';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-gestion-reservations',
  templateUrl: './gestion-reservations.component.html',
  styleUrls: ['./gestion-reservations.component.css']
})
export class GestionReservationsComponent implements OnInit {

  constructor(private reservationService : ReservationService) {
    this.id_terrain = 1 ; 
   }
   reservationsEnAttente: any ;
   oneEvent  = {
    title : '' , 
    start : '' , 
    color : '' , 
   }; 
   objetConsult = {
    hdebut : '' , 
    hfin : '' , 
    status : '' , 
    date : '' , 
    firstName : '' , 
    lastName : '' , 
    numTerrain : 0
   }
  
   objetRepondre =  {
      id_resevation : 0 ,
      hdebut : '' , 
      hfin : '' , 
      status : '' , 
      date : '' , 
      firstName : '' , 
      lastName : '' , 
      email : '' , 
      numTerrain : 0
   }
   verif = false ; 
   refus = false ; 
   accept = false ; 
   dateActuelle : any ; 
  dateClicked : any ; 
  id_terrain : any   ; 
  reservations: any  ; 
  horaires : any =[
    {hdebut:'08:00' , hfin:'09:00'} , 
    {hdebut:'09:00' , hfin:'10:00'} , 
    {hdebut:'10:00' , hfin:'11:00'} , 
    {hdebut:'11:00' , hfin:'12:00'} , 
    {hdebut:'12:00' , hfin:'13:00'} , 
    {hdebut:'13:00' , hfin:'14:00'} , 
    {hdebut:'14:00' , hfin:'15:00'} , 
    {hdebut:'15:00' , hfin:'16:00'} , 
    {hdebut:'16:00' , hfin:'17:00'} , 
    {hdebut:'17:00' , hfin:'18:00'} , 
    {hdebut:'18:00' , hfin:'19:00'} , 
    {hdebut:'19:00' , hfin:'20:00'} , 
  ]
  ngOnInit(): void {
    console.log ("l'id du terrain : " , this.id_terrain) ; 
    this.dateActuelle = this.calendarOptions.initialDate;  
    this.dateClicked = format(this.dateActuelle, 'yyyy-MM-dd'); // Formater la date initiale
    console.log('La date actuelle :', this.dateClicked);
  
    this.reservationService.getReservationsByDateAndTerrainAndStatus(this.dateClicked, this.id_terrain)
      .subscribe(
        data => {
          this.reservations = data ; 
          console.log('Horaires récupérés avec succès:', this.reservations);
        },
        error => {
          console.log('Une erreur est survenue lors de la récupération des horaires:', error);
        }
      );
  
      this.getReservationsEnAttente() ; 
      console.log ("liste events !!! " , this.events ) ; 
  }
  
  getReservationsEnAttente() {
    console.log ("heyy la liste des events : " , this.events) ; 
    this.reservationService.getReservationsEnAttente().subscribe(
      data => {
        this.reservationsEnAttente = data;

        console.log("la liste des reservations en attente : ", this.reservationsEnAttente);

        // Traitement des réservations en attente
        for (let resEnAttente of this.reservationsEnAttente) {
          let event = {
            title: 'demandes',
            start: resEnAttente.date,
            color: '#EFBA77'
          };
          this.events.push(event);
          this.calendarOptions.events = this.events;
          
        }
       
      },
      error => {
        console.log('erreur lors de la recupération de la liste des reservations en attente  ' , error) ; 
      }
    );
          
      
  }

  
  events : any  = {}; 
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    weekends: false , // initial value 
    initialDate: new Date() , 
    events: this.events ,
    eventClick : this.handleDateClick.bind(this),// your event array
    dateClick: this.handleDateClick.bind(this) , 
    selectable: true,
    select: this.handleDateSelect.bind(this)

  };
 
  handleDateClick(arg : any ) {
    console.log(arg) ;
    console.log(arg.event.start) ;
    //console.log(arg.event.start.toISOString().substr(0, 10));
    const dateStr = format(arg.event.start, 'yyyy-MM-dd');
    console.log(dateStr);
   }
   
   handleDateSelect(selectInfo:any ) {
    this.verif = false ; 
     //console.log(selectInfo.startStr);
     this.dateClicked = selectInfo.startStr ; 
     this.reservationService.getReservationsByDateAndTerrainAndStatus(this.dateClicked, this.id_terrain)
    .subscribe(
      data => {
        this.reservations = data ; 
        console.log('Horaires récupérés avec succès:', this.reservations);
        if (this.reservations.length === 0) {
          console.log('Le tableau de réservations est vide.');
          this.verif = true ; 
        }
      },
      error => {
        console.log('Une erreur est survenue lors de la récupération des horaires:', error);
      }
    );

      }
      
     onTerrainSelect() {
      console.log(this.id_terrain); // Affiche la valeur sélectionnée dans la console
      this.reservationService.getReservationsByDateAndTerrainAndStatus(this.dateClicked, this.id_terrain)
      .subscribe(
        data => {
          this.reservations = data ; 
          console.log('Horaires récupérés avec succès:', this.reservations);
        },
        error => {
          console.log('Une erreur est survenue lors de la récupération des horaires:', error);
        }
      );
    }
   
     consulterReservation(hdebut : any , hfin : any , status : any , date : any , nomUser : any , prenomUser : any , numTerrain : any ) {
        this.objetConsult.hdebut = hdebut ; 
        this.objetConsult.hfin = hfin ; 
        this.objetConsult.status = status ; 
        this.objetConsult.date = date ; 
        this.objetConsult.firstName = nomUser ; 
        this.objetConsult.lastName = prenomUser ; 
        this.objetConsult.numTerrain = numTerrain ; 
     }
     //(click)="repondreReservation(reservation.id , reservation.hdebut , reservation.hfin , reservation.status , reservation.date , reservation.user.nom , reservation.user.prenom , reservation.user.prenom , reservation.user.email , reservation.terrain.num_terrain )"
     repondreReservation(idRes : any , hdebut : any , hfin : any , status : any , date : any , nomUser : any , prenomUser : any , emailUser : any , numTerrain : any  )

     {
        this.objetRepondre.id_resevation = idRes ; 
        this.objetRepondre.hdebut = hdebut ; 
        this.objetRepondre.hfin = hfin ; 
        this.objetRepondre.status = status ; 
        this.objetRepondre.date = date ; 
        this.objetRepondre.firstName = nomUser ; 
        this.objetRepondre.lastName = prenomUser ; 
        this.objetRepondre.email = emailUser ; 
        this.objetRepondre.numTerrain = numTerrain ; 

     }
     accepterReservation () {
      this.reservationService.validerReservation(this.objetRepondre.id_resevation , this.objetRepondre.email ) .subscribe(
        exist => {
          if (exist) {
            console.log('La réservation a été accptée avec succès.');
            this.accept = true ; 
            setTimeout(() => {
              this.accept = false;
            }, 3000); // 3000 ms = 3 secondes
             
            this.reservationService.getReservationsByDateAndTerrainAndStatus(this.dateClicked, this.id_terrain)
            .subscribe(
              data => {
                this.reservations = data ; 
                console.log('Horaires récupérés avec succès:', this.reservations);
              },
              error => {
                console.log('Une erreur est survenue lors de la récupération des horaires:', error);
              }
            );
          } else {
            console.log('L\'utilisateur n\'existe pas.');
          }
        },
        error => {
          console.log('Une erreur est survenue lors du refus de la réservation :', error);
        }
      );
     }
     refuserReservation () {
      this.reservationService.refuserReservation(this.objetRepondre.id_resevation , this.objetRepondre.email ) .subscribe(
        exist => {
          if (exist) {
            console.log('La réservation a été refusée avec succès.');
            this.refus = true ; 
            setTimeout(() => {
              this.refus= false;
            }, 3000); // 3000 ms = 3 secondes
            this.reservationService.getReservationsByDateAndTerrainAndStatus(this.dateClicked, this.id_terrain)
      .subscribe(
        data => {
          this.reservations = data ; 
          console.log('Horaires récupérés avec succès:', this.reservations);
        },
        error => {
          console.log('Une erreur est survenue lors de la récupération des horaires:', error);
        }
      );
          } else {
            console.log('L\'utilisateur n\'existe pas.');
          }
        },
        error => {
          console.log('Une erreur est survenue lors du refus de la réservation :', error);
        }
      );
     }

}    
