import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './components/dashbord/dashbord.component';

import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path:""  , component :DashbordComponent },
  {path : "ListeAdhérents" , component:TableComponent},
  {path : "Dashboard" , component:DashbordComponent},
  {path : "Profil" , component:ProfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
