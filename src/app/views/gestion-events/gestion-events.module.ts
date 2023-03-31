import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEventsRoutingModule } from './gestion-events-routing.module';
import { GestionEventsComponent } from './gestion-events/gestion-events.component';



@NgModule({
  declarations: [

  
    GestionEventsComponent
  ],
  imports: [
    CommonModule,
    GestionEventsRoutingModule
  ]
})
export class GestionEventsModule { }
