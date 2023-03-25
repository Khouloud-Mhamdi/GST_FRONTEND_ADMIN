import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeModerateursRoutingModule } from './liste-moderateurs-routing.module';
import { ListeModerateursComponent } from './liste-moderateurs/liste-moderateurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';


@NgModule({
  declarations: [
    ListeModerateursComponent
  ],
  imports: [
    CommonModule,
    ListeModerateursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListeModerateursModule { }
