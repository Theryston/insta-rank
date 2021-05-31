import { PlanosComponent } from './views/planos/planos.component';
import { AuthInstagramComponent } from './views/auth-instagram/auth-instagram.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './views/conectar/conectar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { RegistrarComponent } from './views/registrar/registrar.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'conectar',
  component: ConectarComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'password/forgot',
  component: ForgotPasswordComponent
}, {
  path: 'password/reset',
  component: ResetPasswordComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
