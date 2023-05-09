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
import { ModerateurGuardGuard } from './services/moderateur-guard.guard';
import { ErreurPageComponent } from './layouts/erreur-page/erreur-page.component';



const routes: Routes = [

  {path:'erreur' , component: ErreurPageComponent   },
  {path:'' , component: LoginLayoutComponent   },
  {path:'forgetPassword' , component: ForgetPasswordLayoutComponent   },
  {path:'resetPassword' , component: ResetPasswordLayoutComponent   },


  {path:'admin' , component:AdminLayoutComponent  ,children:[
    {path:'dashboard' , canActivate: [AdminGuardGuard]  , loadChildren:()=>import('./views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path:'addUser' ,  canActivate: [AdminGuardGuard] ,loadChildren:()=>import('./views/add-user/add-user.module').then(m=>m.AddUserModule)},
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},

    {path:'adherents' ,  canActivate: [AdminGuardGuard] , loadChildren:()=>import('./views/liste-adherents/liste-adherents.module').then(m=>m.ListeAdherentsModule)},
   
    {path:'moderateurs', canActivate: [AdminGuardGuard] , loadChildren:()=>import('./views/liste-moderateurs/liste-moderateurs.module').then(m=>m.ListeModerateursModule)},
    {path:'addEvent' , canActivate: [AdminGuardGuard] , loadChildren:()=>import('./views/ajout-event/ajout-event.module').then(m=>m.AjoutEventModule) } ,
    {path:'listeEvents' , canActivate: [AdminGuardGuard] , loadChildren:()=>import('./views/gestion-events/gestion-events.module').then(m=>m.GestionEventsModule) }

  ]},
  {path:'moderateur' , component:ModerateurLayoutComponent , children:[
    {path:'entraineurs' ,  canActivate: [ModerateurGuardGuard]  , loadChildren:()=>import('./views/gestion-entraineurs/gestion-entraineurs.module').then(m=>m.GestionEntraineursModule)},
    {path:'profil' , canActivate: [ModerateurGuardGuard]  , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    { path: '', redirectTo: 'profil', pathMatch: 'full' },
    {path:'addEntraineur' ,  canActivate: [ModerateurGuardGuard]  , loadChildren:()=>import('./views/add-entraineur/add-entraineur.module').then(m=>m.AddEntraineurModule)},
    {path:'consultation' , canActivate: [ModerateurGuardGuard]  , loadChildren:()=>import('./views/consultation-membres-moderateur/consultation-membres-moderateur.module').then(m=>m.ConsultationMembresModerateurModule)},
  ]},


  {path:'gestionnaire' , component:GestionnaireLayoutComponent ,children:[

    
    { path: '', redirectTo: 'profil', pathMatch: 'full' },
    {path:'profil' , loadChildren:()=>import('./views/profil/profil.module').then(m=>m.ProfilModule)},
    {path:'reservations' , loadChildren:()=>import('./views/gestion-reservations/gestion-reservations.module').then(m=>m.GestionReservationsModule)},
    {path:'liste' , canActivate: [GestionnaireGuardGuard]  , loadChildren:()=>import('./views/confirmer-inscriptions/confirmer-inscriptions.module').then(m=>m.ConfirmerInscriptionsModule)},
    {path:'membres' , canActivate: [GestionnaireGuardGuard]  , loadChildren:()=>import('./views/liste-membres/liste-membres.module').then(m=>m.ListeMembresModule)},
  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
