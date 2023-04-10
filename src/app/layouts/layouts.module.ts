import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModerateurLayoutComponent } from './moderateur-layout/moderateur-layout.component';
import { GestionnaireLayoutComponent } from './gestionnaire-layout/gestionnaire-layout.component';
import { ForgetPasswordLayoutComponent } from './forget-password-layout/forget-password-layout.component';
import { ResetPasswordLayoutComponent } from './reset-password-layout/reset-password-layout.component';
import { ErreurPageComponent } from './erreur-page/erreur-page.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginLayoutComponent,
    ModerateurLayoutComponent,
    GestionnaireLayoutComponent,
    ForgetPasswordLayoutComponent,
    ResetPasswordLayoutComponent,
    ErreurPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LayoutsModule { }
