import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjoutEntraineurRoutingModule } from './ajout-entraineur-routing.module';
import { AjoutEntraineurComponent } from './ajout-entraineur/ajout-entraineur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AjoutEntraineurComponent
  ],
  imports: [
    CommonModule,
    AjoutEntraineurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AjoutEntraineurModule { }
