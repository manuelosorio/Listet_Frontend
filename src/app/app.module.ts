import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './_components/user/user.component';
import { ListComponent } from './_components/list/list.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { HomeComponent } from './_pages/home/home.component';
import { NavComponent } from './_components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './_components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconsModule} from './_modules/icons/icons.module';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ListComponent,
    ProfileComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
