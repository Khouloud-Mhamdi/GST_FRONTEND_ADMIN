import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionReservationsRoutingModule } from './gestion-reservations-routing.module';
import { GestionReservationsComponent } from './gestion-reservations/gestion-reservations.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    GestionReservationsComponent
  ],
  imports: [
    CommonModule,
    GestionReservationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule , 
  ]
})
export class GestionReservationsModule { }
