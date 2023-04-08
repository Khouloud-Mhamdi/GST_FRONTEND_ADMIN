import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntraineurComponent } from './add-entraineur/add-entraineur.component';

const routes: Routes = [
  {path : '' , component : AddEntraineurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEntraineurRoutingModule { }
