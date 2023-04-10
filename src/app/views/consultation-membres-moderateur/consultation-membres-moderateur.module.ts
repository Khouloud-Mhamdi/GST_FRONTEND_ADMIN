import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationMembresModerateurRoutingModule } from './consultation-membres-moderateur-routing.module';
import { ConsultationMembresModerateurComponent } from './consultation-membres-moderateur/consultation-membres-moderateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultationMembresModerateurComponent
  ],
  imports: [
    CommonModule,
    ConsultationMembresModerateurRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConsultationMembresModerateurModule { }
