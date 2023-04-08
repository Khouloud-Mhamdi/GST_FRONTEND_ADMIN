import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEntraineurRoutingModule } from './add-entraineur-routing.module';
import { AddEntraineurComponent } from './add-entraineur/add-entraineur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEntraineurComponent
  ],
  imports: [
    CommonModule,
    AddEntraineurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddEntraineurModule { }
