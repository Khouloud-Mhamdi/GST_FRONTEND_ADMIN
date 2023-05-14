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
   testDate : any  = ''; 
   events : any  = {}; 
   reservationsEnAttente: any ;
   reservationAcceptee : any ; 
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
    numTerrain : 0 , 
    email : '' , 
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
  
  ngOnInit(): void {
    this.getReservationsEnAttente() ; 
    this.getReservationAcceptee() ; 
    console.log ("liste events !!! " , this.events ) ; 
    console.log ("l'id du terrain : " , this.id_terrain) ; 
    this.dateActuelle = this.calendarOptions.initialDate;  
    this.dateClicked = format(this.dateActuelle, 'yyyy-MM-dd'); // Formater la date initiale
    console.log('La date actuelle :', this.dateClicked);
  
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
  
  getReservationsEnAttente() {
    this.reservationService.getReservationsEnAttenteByTerrain(this.id_terrain).subscribe(
      data => {
        this.reservationsEnAttente = data;
        console.log("data de reservation en attente : ", data);
        console.log("la liste des reservations en attente : ", this.reservationsEnAttente);
  
        // Traitement des réservations en attente
        const events = [];
        const dates = [];
  
        for (let resEnAttente of this.reservationsEnAttente) {
          if (dates.indexOf(resEnAttente.date) === -1) {
            dates.push(resEnAttente.date);
            let event = {
              title: 'demandes',
              start: resEnAttente.date,
              color: '#EFBA77'
            };
            console.log("event by event push : ", event);
            events.push(event);
          }
        }
  
        this.calendarOptions.events = events;
      },
      error => {
        console.log('erreur lors de la récupération de la liste des réservations en attente ', error);
      }
    );
  }
  getReservationAcceptee() {
    this.reservationService.getReservationsAccepteesByTerrain(this.id_terrain).subscribe(
      data => {
        this.reservationAcceptee = data;
        console.log("data de reservation en attente : ", data);
        console.log("la liste des reservations en attente : ", this.reservationAcceptee);
  
        // Traitement des réservations en attente
        const events = [];
        const dates = [];
  
        for (let resAcceptee of this.reservationAcceptee) {
          if (dates.indexOf(resAcceptee.date) === -1) {
            dates.push(resAcceptee.date);
            let event = {
              title: 'reservation',
              start: resAcceptee.date,
              color: '#7EE27E'
            };
            console.log("event by event push : ", event);
            events.push(event);
          }
        }
  
        this.calendarOptions.events = events;
      },
      error => {
        console.log('erreur lors de la récupération de la liste des réservations acceptée ', error);
      }
    );
  }
  

  

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
      this.verif = false ; 
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
      this.events = {} ; 
      this.getReservationsEnAttente() ; 
      this.getReservationAcceptee() ; 
    }
   
     consulterReservation(hdebut : any , hfin : any , status : any , date : any , nomUser : any , prenomUser : any , numTerrain : any , email : any ) {
        this.objetConsult.hdebut = hdebut ; 
        this.objetConsult.hfin = hfin ; 
        this.objetConsult.status = status ; 
        this.objetConsult.date = date ; 
        this.objetConsult.firstName = nomUser ; 
        this.objetConsult.lastName = prenomUser ; 
        this.objetConsult.numTerrain = numTerrain ; 
        this.objetConsult.email = email ; 
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
