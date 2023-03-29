import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AjoutUtilisateurComponent } from './components/ajout-utilisateur/ajout-utilisateur.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

import { HomeComponent } from './components/home/home.component';
import { ListeAdherentComponent } from './components/liste-adherent/liste-adherent.component';
import { ListeGestionnairesComponent } from './components/liste-gestionnaires/liste-gestionnaires.component';
import { ListeModerateursComponent } from './components/liste-moderateurs/liste-moderateurs.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ModerateurLayoutComponent } from './layouts/moderateur-layout/moderateur-layout.component';


const routes: Routes = [

  {path:'' , component: LoginLayoutComponent},
  {path:'admin' , component:AdminLayoutComponent ,children:[
    {path:'dashboard' , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'addUser' , loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'adherents' , loadChildren:()=>import('./views/liste-adherents/liste-adherents.module').then(m=>m.ListeAdherentsModule)},
    {path:'gestionnaires' , loadChildren:()=>import('./views/liste-gestionnaires/liste-gestionnaires.module').then(m=>m.ListeGestionnairesModule)},
    {path:'moderateurs' , loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},
  ]},
  {path:'moderateur' , component:ModerateurLayoutComponent ,children:[
    {path:'entraineurs' , loadChildren:()=>import('./views/gestion-entraineurs/gestion-entraineurs.module').then(m=>m.GestionEntraineursModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    { path: '', redirectTo: 'profil', pathMatch: 'full' },
    {path:'ajout' , loadChildren:()=>import('./views/ajout-entraineur/ajout-entraineur.module').then(m=>m.AjoutEntraineurModule)},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
