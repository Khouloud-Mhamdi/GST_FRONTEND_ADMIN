import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfilComponent } from './components/profil/profil.component';

import { FormAjoutComponent } from './components/form-ajout/form-ajout.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ListeModerateursComponent } from './components/liste-moderateurs/liste-moderateurs.component';
import { ListeGestionnairesComponent } from './components/liste-gestionnaires/liste-gestionnaires.component';
import { AjoutUtilisateurComponent } from './components/ajout-utilisateur/ajout-utilisateur.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListeAdherentComponent } from './components/liste-adherent/liste-adherent.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ProfilComponent,

    FormAjoutComponent,
    DashbordComponent,
    ListeModerateursComponent,
    ListeGestionnairesComponent,
    AjoutUtilisateurComponent,
    ListeAdherentComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
