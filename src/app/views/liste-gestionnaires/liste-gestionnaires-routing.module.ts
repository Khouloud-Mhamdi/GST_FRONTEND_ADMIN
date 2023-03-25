import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeGestionnairesComponent } from './liste-gestionnaires/liste-gestionnaires.component';

const routes: Routes = [
  {path:'' , component: ListeGestionnairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeGestionnairesRoutingModule { }
