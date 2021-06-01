import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { RegistrarComponent } from './views/registrar/registrar.component';
import { ConectarComponent } from './views/conectar/conectar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInstagramComponent } from './views/auth-instagram/auth-instagram.component';
import { PlanosComponent } from './views/planos/planos.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { CompatibleComponent } from './views/compatible/compatible.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrarComponent,
    ConectarComponent,
    DashboardComponent,
    AuthInstagramComponent,
    PlanosComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompatibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
