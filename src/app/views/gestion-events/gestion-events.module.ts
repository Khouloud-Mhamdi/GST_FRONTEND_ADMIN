import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEventsRoutingModule } from './gestion-events-routing.module';
import { GestionEventsComponent } from './gestion-events/gestion-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GestionEventsComponent
  ],
  imports: [
    CommonModule,
    GestionEventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GestionEventsModule { }
