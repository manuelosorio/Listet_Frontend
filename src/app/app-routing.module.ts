import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {ListComponent} from './_components/list/list.component';
import {UserComponent} from './_components/user/user.component';

// Guards
import {GuestGuard} from './guards/guest.guard';
import {AuthGuard} from './guards/auth.guard';

// Pages
import {HomeComponent} from './_pages/home/home.component';
import {ForgotPasswordComponent} from './_pages/forgot-password/forgot-password.component';
import {ListDetailsComponent} from './_pages/list-details/list-details.component';
import {LoginComponent} from './_pages/login/login.component';
import {NotFoundComponent} from './_pages/not-found/not-found.component';
import {RegisterComponent} from './_pages/register/register.component';
import {ResetPasswordComponent} from './_pages/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lists', component: ListComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Login',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
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
