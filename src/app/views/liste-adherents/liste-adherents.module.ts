import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeAdherentsRoutingModule } from './liste-adherents-routing.module';
import { ListeAdherentsComponent } from './liste-adherents/liste-adherents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListeAdherentsComponent
  ],
  imports: [
    CommonModule,
    ListeAdherentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListeAdherentsModule { }
