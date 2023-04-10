import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmerInscriptionComponent } from './confirmer-inscription/confirmer-inscription.component';

const routes: Routes = [
  {path:'' , component:ConfirmerInscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmerInscriptionsRoutingModule { }