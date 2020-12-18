import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {ForgotPasswordComponent} from './_components/forgot-password/forgot-password.component';
import {ListComponent} from './_components/list/list.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterComponent} from './_components/register/register.component';
import {ResetPasswordComponent} from './_components/reset-password/reset-password.component';
import {UserComponent} from './_components/user/user.component';

// Guards
import {GuestGuard} from './guards/guest.guard';
import {AuthGuard} from './guards/auth.guard';

// Pages
import {HomeComponent} from './_pages/home/home.component';
import {ListDetailsComponent} from './_pages/list-details/list-details.component';
import {NotFoundComponent} from './_pages/not-found/not-found.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lists', component: ListComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Login',
      image: 'https://listet.manuelosorio.me/assets/images/listet-banner.jpg/',
      url: 'https://listet.manuelosorio.me/login'
    }]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent, canActivate: [GuestGuard]},
  {path: 'u/:username', component: HomeComponent },
  {path: 'l/:username/:slug', component: ListDetailsComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard]},
  {path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
