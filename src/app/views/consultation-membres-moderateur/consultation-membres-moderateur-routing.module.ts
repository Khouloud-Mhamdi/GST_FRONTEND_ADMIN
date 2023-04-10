import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationMembresModerateurComponent } from './consultation-membres-moderateur/consultation-membres-moderateur.component';

const routes: Routes = [
  {path : '' , component:ConsultationMembresModerateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationMembresModerateurRoutingModule { }
