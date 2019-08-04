import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LinkGeneratorComponent} from './link-generator/link-generator.component';


const routes: Routes = [
  { path: '', component: LinkGeneratorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'linkgenerator', component: LinkGeneratorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
