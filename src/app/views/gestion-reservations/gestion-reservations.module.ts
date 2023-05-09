import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionReservationsRoutingModule } from './gestion-reservations-routing.module';
import { GestionReservationsComponent } from './gestion-reservations/gestion-reservations.component';


@NgModule({
  declarations: [
    GestionReservationsComponent
  ],
  imports: [
    CommonModule,
    GestionReservationsRoutingModule
  ]
})
export class GestionReservationsModule { }
