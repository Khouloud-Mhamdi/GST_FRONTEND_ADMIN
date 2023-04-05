import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmerInscriptionsRoutingModule } from './confirmer-inscriptions-routing.module';
import { ConfirmerInscriptionComponent } from './confirmer-inscription/confirmer-inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmerInscriptionComponent
  ],
  imports: [
    CommonModule,
    ConfirmerInscriptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConfirmerInscriptionsModule { }
