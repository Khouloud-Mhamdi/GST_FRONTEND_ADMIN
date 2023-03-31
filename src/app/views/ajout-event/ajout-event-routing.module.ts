import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutEventComponent } from './ajout-event/ajout-event.component';

const routes: Routes = [
  {path:'' , component: AjoutEventComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutEventRoutingModule { }
