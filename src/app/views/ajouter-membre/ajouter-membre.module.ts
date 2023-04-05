import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouterMembreRoutingModule } from './ajouter-membre-routing.module';
import { AjouterMembreComponent } from './ajouter-membre/ajouter-membre.component';


@NgModule({
  declarations: [
    AjouterMembreComponent
  ],
  imports: [
    CommonModule,
    AjouterMembreRoutingModule
  ]
})
export class AjouterMembreModule { }
