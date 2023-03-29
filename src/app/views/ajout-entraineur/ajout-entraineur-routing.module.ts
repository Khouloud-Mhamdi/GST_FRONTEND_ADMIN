import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutEntraineurComponent } from './ajout-entraineur/ajout-entraineur.component';

const routes: Routes = [
  {
    path:'' , component : AjoutEntraineurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutEntraineurRoutingModule { }
