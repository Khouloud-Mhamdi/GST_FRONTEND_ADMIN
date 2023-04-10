import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeMembresRoutingModule } from './liste-membres-routing.module';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListeMembresComponent
  ],
  imports: [
    CommonModule,
    ListeMembresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListeMembresModule { }
