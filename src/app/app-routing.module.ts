import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

import { HomeComponent } from './components/home/home.component';
import { ListeAdherentComponent } from './components/liste-adherent/liste-adherent.component';
import { ListeGestionnairesComponent } from './components/liste-gestionnaires/liste-gestionnaires.component';
import { ListeModerateursComponent } from './components/liste-moderateurs/liste-moderateurs.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


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
  {path:"MotDePasseOublie"  , component : ForgetPasswordComponent },
  {path:"resetPassword"  , component : ResetPasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
