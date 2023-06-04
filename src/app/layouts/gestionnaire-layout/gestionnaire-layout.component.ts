import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-gestionnaire-layout',
  templateUrl: './gestionnaire-layout.component.html',
  styleUrls: ['./gestionnaire-layout.component.css']
})
export class GestionnaireLayoutComponent implements OnInit {
    membres:any;
    nb_membres:any;
    reservations :any;
    nb_reservations:any;
  constructor(private token : TokenStorageService , private router : Router,private InscriptionService :  InscriptionService ) { }
  currentUser : any ;
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.InscriptionService.DemandeInscriptions().subscribe((data)=>{
      this.membres = data;
     
      this.nb_membres = this.membres.length;
     
    })
    this.InscriptionService.ListeDesReservations().subscribe((data)=>{
      this.reservations = data;
      console.log("liste des reservation ? " , this.reservation)
     
      this.nb_reservations = this.reservations.length;
     
    })

  }
  deconnect(){
    this.token.signOut();
    this.router.navigate(['']);
   }
   storeData(a: any) {
    sessionStorage.setItem('date', a.date);
    sessionStorage.setItem('terrainId', a.terrain.id_terrain);
    this.router.navigate(['/gestionnaire/reservations']).then(() => {
      window.location.reload();
    });
  }
  reservation() {
    sessionStorage.removeItem('date');
    sessionStorage.removeItem('terrainId');
    this.router.navigate(['/gestionnaire/reservations']);
  }
}
