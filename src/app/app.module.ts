import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { APP_ID, NgModule } from '@angular/core';
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
import { VerifiedGuard } from './guards/verified.guard';
import { SearchComponent } from './_components/search/search.component';
import { SearchResultsComponent } from './_pages/search-results/search-results.component';
import { SearchDataService } from './shared/search-data.service';
import { UserCardComponent } from './_components/user-card/user-card.component';

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
    NotFoundComponent,
    BackButtonComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    CreateListComponent,
    YourListComponent,
    SearchComponent,
    SearchResultsComponent,
    UserCardComponent,
  ],
  imports: [
    ActionButtonModule,
    AlertComponent,
    BrowserAnimationsModule,
    CharacterCounterModule,
    DeadlineModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
  ],
  providers: [
    { provide: APP_ID, useValue: 'listet-server-app' },
    provideClientHydration(),
    GuestGuard,
    VerifiedGuard,
    AuthGuard,
    ListDataService,
    SearchDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
