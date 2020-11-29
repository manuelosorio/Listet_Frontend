import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';


// Components
import { AppComponent } from './app.component';
import { BackButtonComponent } from './_components/back-button/back-button.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ForgotPasswordComponent } from './_components/forgot-password/forgot-password.component';
import { ListComponent } from './_components/list/list.component';
import { ListCommentsComponent } from './_components/list-comments/list-comments.component';
import { ListItemsComponent } from './_components/list-items/list-items.component';
import { ListHeaderComponent } from './_components/list-header/list-header.component';
import { LoginComponent } from './_components/login/login.component';
import { NavComponent } from './_components/nav/nav.component';
import { RegisterComponent } from './_components/register/register.component';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { UserComponent } from './_components/user/user.component';

// Guards
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './_modules/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Service

// Pages
import { HomeComponent } from './_pages/home/home.component';
import { ListDetailsComponent } from './_pages/list-details/list-details.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { ProfileComponent } from './_pages/profile/profile.component';
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
    LoginComponent,
    ListDetailsComponent,
    ListHeaderComponent,
    ListCommentsComponent,
    ListItemsComponent,
    NotFoundComponent,
    BackButtonComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule
  ],
  providers: [GuestGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
