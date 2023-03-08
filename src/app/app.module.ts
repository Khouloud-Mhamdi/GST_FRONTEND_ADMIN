import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TableComponent } from './components/table/table.component';
import { FormAjoutComponent } from './components/form-ajout/form-ajout.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ListeModerateursComponent } from './components/liste-moderateurs/liste-moderateurs.component';
import { ListeGestionnairesComponent } from './components/liste-gestionnaires/liste-gestionnaires.component';
import { AjoutUtilisateurComponent } from './components/ajout-utilisateur/ajout-utilisateur.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ProfilComponent,
    TableComponent,
    FormAjoutComponent,
    DashbordComponent,
    ListeModerateursComponent,
    ListeGestionnairesComponent,
    AjoutUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
