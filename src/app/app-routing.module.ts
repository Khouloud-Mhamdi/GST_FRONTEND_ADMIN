import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ForgetPasswordLayoutComponent } from './layouts/forget-password-layout/forget-password-layout.component';
import { GestionnaireLayoutComponent } from './layouts/gestionnaire-layout/gestionnaire-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ModerateurLayoutComponent } from './layouts/moderateur-layout/moderateur-layout.component';
import { ResetPasswordLayoutComponent } from './layouts/reset-password-layout/reset-password-layout.component';
import { AdminGuardGuard } from './services/admin-guard.guard';



import { GestionnaireGuardGuard } from './services/gestionnaire-guard.guard';



const routes: Routes = [

  {path:'' , component: LoginLayoutComponent   },
  {path:'forgetPassword' , component: ForgetPasswordLayoutComponent   },
  {path:'resetPassword' , component: ResetPasswordLayoutComponent   },


  {path:'admin' , component:AdminLayoutComponent  ,children:[
    {path:'dashboard' , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'addUser' ,  canActivate: [AdminGuardGuard] ,loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'adherents' , loadChildren:()=>import('./views/liste-adherents/liste-adherents.module').then(m=>m.ListeAdherentsModule)},
    {path:'gestionnaires' , loadChildren:()=>import('./views/liste-gestionnaires/liste-gestionnaires.module').then(m=>m.ListeGestionnairesModule)},
    {path:'moderateurs' , loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},
    {path:'addEvent' ,loadChildren:()=>import('./views/ajout-event/ajout-event.module').then(m=>m.AjoutEventModule) }
  ]},
  {path:'moderateur' , component:ModerateurLayoutComponent ,  canActivate: [GestionnaireGuardGuard] , children:[
    {path:'entraineurs' , loadChildren:()=>import('./views/gestion-entraineurs/gestion-entraineurs.module').then(m=>m.GestionEntraineursModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    { path: '', redirectTo: 'profil', pathMatch: 'full' },
    {path:'ajout' , loadChildren:()=>import('./views/ajout-entraineur/ajout-entraineur.module').then(m=>m.AjoutEntraineurModule)},
  ]},
  

  {path:'gestionnaire' , component:GestionnaireLayoutComponent , canActivate: [GestionnaireGuardGuard],children:[

    {path:'dashboard' , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'addUser' ,  loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},

    {path:'gestionnaires', canActivate: [GestionnaireGuardGuard],loadChildren:()=>import('./views/liste-gestionnaires/liste-gestionnaires.module').then(m=>m.ListeGestionnairesModule)},
    {path:'moderateurs' , canActivate: [GestionnaireGuardGuard],loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},




  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
