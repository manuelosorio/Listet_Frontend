import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from './shared/ngx-masonry/ngx-masonry.module';


// Components
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert/alert.component';
import { BackButtonComponent } from './_components/back-button/back-button.component';
import { CreateListComponent } from './_pages/create-list/create-list.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ListComponent } from './_components/list/list.component';
import { NavComponent } from './_components/nav/nav.component';
import { UserComponent } from './_components/user/user.component';
import { VerifyAccountComponent } from './_components/verify-account/verify-account.component';
import { YourListComponent } from './_pages/your-list/your-list.component';


// Guards
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ActionButtonModule } from './shared/action-button/action-button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterCounterModule } from './shared/character-counter/character-counter.module';
import { IconsModule } from './_modules/icons/icons.module';
import { DeadlineModule } from './shared/deadline/deadline.module';

// Service
import { ListDataService } from './shared/list-data.service';

// Pages
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { RegisterComponent } from './_pages/register/register.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { SettingsComponent } from './_pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    UserComponent,
    ListComponent,
    ProfileComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    BackButtonComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    CreateListComponent,
    YourListComponent,
    SettingsComponent
  ],
  imports: [
    ActionButtonModule,
    CharacterCounterModule,
    DeadlineModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
  ],
  providers: [GuestGuard, AuthGuard, ListDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
