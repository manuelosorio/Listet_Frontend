import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Components
import { ListComponent } from './_components/list/list.component';
import { UserComponent } from './_components/user/user.component';
import { VerifyAccountComponent } from './_components/verify-account/verify-account.component';

// Guards
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

// Pages
import { HomeComponent } from './_pages/home/home.component';
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { LoginComponent } from './_pages/login/login.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { RegisterComponent } from './_pages/register/register.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { CreateListComponent } from './_pages/create-list/create-list.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { YourListComponent } from './_pages/your-list/your-list.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Home',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/'
    }]
  },
  {
    path: 'lists', component: ListComponent, data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Lists',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/lists'
    }]
  },
  {
    path: 'your-lists', component: YourListComponent, data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Lists',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/lists'
    }],
    canActivate: [GuestGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: 'users', component: UserComponent, canActivate: [GuestGuard] },
  {
    path: 'u/:username', component: ProfileComponent, data: [{
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - ',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/'
    }]
  },
  {
    path: 'l/:slug',
    loadChildren: () => import('./_pages/list-details/list-details.module').then(m => m.ListDetailsModule),
    // component: ListDetailsComponent,
  },
  { path: 'create-list', component: CreateListComponent, canActivate: [GuestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
  { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'verify-account/:token', component: VerifyAccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'corrected',
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
