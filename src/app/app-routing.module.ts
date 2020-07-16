import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './_components/user/user.component';
import {HomeComponent} from './_pages/home/home.component';
import {ListComponent} from './_components/list/list.component';
import {RegisterComponent} from './_components/register/register.component';
import {LoginComponent} from './_components/login/login.component';
import {ListDetailsComponent} from './_pages/list-details/list-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lists', component: ListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserComponent },
  {path: ':username', component: HomeComponent },
  {path: ':username/:slug', component: ListDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
