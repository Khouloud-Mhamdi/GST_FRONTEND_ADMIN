import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeMembresRoutingModule } from './liste-membres-routing.module';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';


@NgModule({
  declarations: [
    ListeMembresComponent
  ],
  imports: [
    CommonModule,
    ListeMembresRoutingModule
  ]
})
export class ListeMembresModule { }
