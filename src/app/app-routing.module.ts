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
import { GestionnaireLayoutComponent } from './layouts/gestionnaire-layout/gestionnaire-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AdminGuardGuard } from './services/admin-guard.guard';


import { AuthGuard } from './services/auth.guard';
import { GestionnaireGuardGuard } from './services/gestionnaire-guard.guard';



const routes: Routes = [

  {path:'' , component: LoginLayoutComponent},
  {path:'admin' , component:AdminLayoutComponent  ,children:[
    {path:'dashboard' , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'addUser' ,  canActivate: [AdminGuardGuard] ,loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'adherents' ,  canActivate: [AdminGuardGuard],loadChildren:()=>import('./views/liste-adherents/liste-adherents.module').then(m=>m.ListeAdherentsModule)},
    {path:'gestionnaires', canActivate: [AdminGuardGuard],loadChildren:()=>import('./views/liste-gestionnaires/liste-gestionnaires.module').then(m=>m.ListeGestionnairesModule)},
    {path:'moderateurs' , canActivate: [AdminGuardGuard],loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},
  ]},

  {path:'gestionnaire' , component:GestionnaireLayoutComponent , canActivate: [GestionnaireGuardGuard],children:[

    {path:'dashboard' , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'addUser' ,  loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'adherents' ,  canActivate: [GestionnaireGuardGuard] ,loadChildren:()=>import('./views/liste-adherents/liste-adherents.module').then(m=>m.ListeAdherentsModule)},
    {path:'gestionnaires', canActivate: [GestionnaireGuardGuard],loadChildren:()=>import('./views/liste-gestionnaires/liste-gestionnaires.module').then(m=>m.ListeGestionnairesModule)},
    {path:'moderateurs' , canActivate: [GestionnaireGuardGuard],loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},




  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
