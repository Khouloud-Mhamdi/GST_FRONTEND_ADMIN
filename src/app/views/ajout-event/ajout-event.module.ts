import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjoutEventRoutingModule } from './ajout-event-routing.module';
import { AjoutEventComponent } from './ajout-event/ajout-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AjoutEventComponent
  ],
  imports: [
    CommonModule,
    AjoutEventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AjoutEventModule { }
