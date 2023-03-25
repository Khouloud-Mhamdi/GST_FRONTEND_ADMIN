import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeModerateursComponent } from './liste-moderateurs/liste-moderateurs.component';

const routes: Routes = [
  {path:'', component:ListeModerateursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeModerateursRoutingModule { }
