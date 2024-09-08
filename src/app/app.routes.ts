import { Routes } from '@angular/router';

// Components
import { ListComponent } from '@components/list/list.component';
import { VerifyAccountComponent } from '@components/verify-account/verify-account.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { VerifiedGuard } from './guards/verified.guard';

// Pages
import { HomeComponent } from '@pages/home/home.component';
import { ForgotPasswordComponent } from '@pages/forgot-password/forgot-password.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { RegisterComponent } from '@pages/register/register.component';
import { ResetPasswordComponent } from '@pages/reset-password/reset-password.component';
import { CreateListComponent } from '@pages/create-list/create-list.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { YourListComponent } from '@pages/your-list/your-list.component';
import { SearchResultsComponent } from '@pages/search-results/search-results.component';

import { environment } from '@environments/environment';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: [
      {
        author: 'Manuel Osorio',
        description: 'Listet is a social todo list tool.',
        title: 'Listet App - Home',
        openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
        twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
        url: `${environment.url}/`,
      },
    ],
  },
  {
    path: 'lists',
    component: ListComponent,
    data: [
      {
        author: 'Manuel Osorio',
        description: 'Listet is a social todo list tool.',
        title: 'Listet App - Lists',
        openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
        twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
        url: `${environment.url}/lists`,
      },
    ],
  },
  {
    path: 'your-lists',
    component: YourListComponent,
    data: [
      {
        author: 'Manuel Osorio',
        description: 'Listet is a social todo list tool.',
        title: 'Listet App - Lists',
        openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
        twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
        url: `${environment.url}/lists`,
      },
    ],
    canActivate: [GuestGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'u/:username',
    component: ProfileComponent,
    data: [
      {
        author: 'Manuel Osorio',
        title: 'Listet App - ',
        openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
        twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
        url: `${environment.url}/`,
      },
    ],
  },
  {
    path: 'l/:slug',
    loadChildren: () =>
      import('./_pages/list-details/list-details.module').then(
        m => m.ListDetailsModule
      ),
    // component: ListDetailsComponent,
  },
  {
    path: 'create-list',
    component: CreateListComponent,
    canActivate: [GuestGuard, VerifiedGuard],
  },
  {
    path: 'settings',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./_pages/settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-account/:token',
    component: VerifyAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: '**', component: NotFoundComponent },
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       initialNavigation: 'enabledBlocking',
//       preloadingStrategy: PreloadAllModules,
//       onSameUrlNavigation: 'reload',
//     }),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutes {}
