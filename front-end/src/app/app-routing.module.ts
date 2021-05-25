import { PlanosComponent } from './views/planos/planos.component';
import { AuthInstagramComponent } from './views/auth-instagram/auth-instagram.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './views/conectar/conectar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { RegistrarComponent } from './views/registrar/registrar.component';

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
  path: 'auth',
  component: AuthInstagramComponent
} ,{ 
  path: 'planos',
  component: PlanosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
