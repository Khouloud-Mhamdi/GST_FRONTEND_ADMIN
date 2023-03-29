import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEntraineursRoutingModule } from './gestion-entraineurs-routing.module';
import { GestionEntraineursComponent } from './gestion-entraineurs/gestion-entraineurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionEntraineursComponent
  ],
  imports: [
    CommonModule,
    GestionEntraineursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GestionEntraineursModule { }
