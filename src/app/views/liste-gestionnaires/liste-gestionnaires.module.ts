import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeGestionnairesRoutingModule } from './liste-gestionnaires-routing.module';
import { ListeGestionnairesComponent } from './liste-gestionnaires/liste-gestionnaires.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [
    ListeGestionnairesComponent
  ],
  imports: [
    CommonModule,
    ListeGestionnairesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListeGestionnairesModule { }
