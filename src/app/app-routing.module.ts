import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, hasCustomClaim, canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const adminOnly = hasCustomClaim('admin');
const redirectLoggedInToQr= () => redirectLoggedInTo(['linkgenerator']);

const routes: Routes = [
  { path: '', component: LoginComponent,
  canActivate: [AngularFireAuthGuard], 
  data: { authGuardPipe: redirectLoggedInToQr }

 },
  { 
    path: 'linkgenerator', 
    component: LinkGeneratorComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{ 
  path: 'dashboard', 
  component: DashboardComponent, 
  canActivate: [AngularFireAuthGuard], 
  data: { authGuardPipe: redirectUnauthorizedToLogin }
}  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
