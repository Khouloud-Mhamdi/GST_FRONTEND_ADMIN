import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEntraineursRoutingModule } from './gestion-entraineurs-routing.module';
import { GestionEntraineursComponent } from './gestion-entraineurs/gestion-entraineurs.component';


@NgModule({
  declarations: [
    GestionEntraineursComponent
  ],
  imports: [
    CommonModule,
    GestionEntraineursRoutingModule
  ]
})
export class GestionEntraineursModule { }
