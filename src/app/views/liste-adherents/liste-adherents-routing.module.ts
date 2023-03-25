import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAdherentComponent } from 'src/app/components/liste-adherent/liste-adherent.component';

const routes: Routes = [
  {path:'' , component:ListeAdherentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeAdherentsRoutingModule { }
