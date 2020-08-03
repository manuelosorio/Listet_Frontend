import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './_components/user/user.component';
import {HomeComponent} from './_pages/home/home.component';
import {ListComponent} from './_components/list/list.component';
import {RegisterComponent} from './_components/register/register.component';
import {LoginComponent} from './_components/login/login.component';
import {ListDetailsComponent} from './_pages/list-details/list-details.component';
import {NotFoundComponent} from './_pages/not-found/not-found.component';
import {GuestGuard} from './guards/guest.guard';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lists', component: ListComponent},
  {path: 'log-in', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent, canActivate: [GuestGuard]},
  {path: ':username', component: HomeComponent },
  {path: ':username/:slug', component: ListDetailsComponent },
  {path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
