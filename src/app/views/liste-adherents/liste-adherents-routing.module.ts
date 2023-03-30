import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAdherentsComponent } from './liste-adherents/liste-adherents.component';


const routes: Routes = [
  {path:'' , component:ListeAdherentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeAdherentsRoutingModule { }
