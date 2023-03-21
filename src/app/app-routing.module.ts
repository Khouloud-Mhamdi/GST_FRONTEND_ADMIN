import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AjoutUtilisateurComponent } from './components/ajout-utilisateur/ajout-utilisateur.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';

import { HomeComponent } from './components/home/home.component';
import { ListeAdherentComponent } from './components/liste-adherent/liste-adherent.component';
import { ListeGestionnairesComponent } from './components/liste-gestionnaires/liste-gestionnaires.component';
import { ListeModerateursComponent } from './components/liste-moderateurs/liste-moderateurs.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';


const routes: Routes = [
  {path:""  , component : LoginComponent },
  {path:"dashboard"  , component : DashbordComponent },
  {path:"home"  , component : AppComponent},
  {path : "ListeAdhérents" , component:ListeAdherentComponent},
  {path : "ListeModérateurs" , component:ListeModerateursComponent},
  {path : "ListeGestionnaires" , component:ListeGestionnairesComponent},
  {path : "Dashboard" , component:DashbordComponent},
  {path : "Profil" , component:ProfilComponent},
  {path:"login"  , component : LoginComponent },
  {path:"addUser"  , component : AjoutUtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
