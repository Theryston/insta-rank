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
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrarComponent,
    ConectarComponent,
    DashboardComponent
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
