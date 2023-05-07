import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionReservationsComponent } from './gestion-reservations/gestion-reservations.component';

const routes: Routes = [
  {path:'' , component:GestionReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionReservationsRoutingModule { }
