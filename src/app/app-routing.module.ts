import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lists', component: ListComponent},
  {path: 'users', component: UserComponent },
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
