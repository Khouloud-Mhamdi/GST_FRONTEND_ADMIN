import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionEntraineursComponent } from '../gestion-entraineurs/gestion-entraineurs/gestion-entraineurs.component';
import { GestionEventsComponent } from './gestion-events/gestion-events.component';

const routes: Routes = [
  {path:'' , component: GestionEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEventsRoutingModule { }
