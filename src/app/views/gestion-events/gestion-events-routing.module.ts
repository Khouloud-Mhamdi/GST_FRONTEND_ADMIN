import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionEntraineursComponent } from '../gestion-entraineurs/gestion-entraineurs/gestion-entraineurs.component';

const routes: Routes = [
  {path:'' , component:GestionEntraineursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEventsRoutingModule { }
