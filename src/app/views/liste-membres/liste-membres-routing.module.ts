import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';

const routes: Routes = [
  {path:'' , component:ListeMembresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeMembresRoutingModule { }
