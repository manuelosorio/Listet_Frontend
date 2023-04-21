import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert/alert.component';
import { CreateListComponent } from './_pages/create-list/create-list.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ListComponent } from './_components/list/list.component';
import { NavComponent } from './_components/nav/nav.component';
import { UserComponent } from './_components/user/user.component';
import { VerifyAccountComponent } from './_components/verify-account/verify-account.component';
import { YourListComponent } from './_pages/your-list/your-list.component';

// Guards

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ActionButtonModule } from './shared/action-button/action-button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterCounterModule } from './shared/character-counter/character-counter.module';
import { IconsModule } from './_modules/icons/icons.module';
import { DeadlineModule } from './shared/deadline/deadline.module';

// Services
import { ListDataService } from './shared/list-data.service';
import { SearchDataService } from './shared/search-data.service';
import { UsersService } from './_services/users.service';

// Pages
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { RegisterComponent } from './_pages/register/register.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { SearchComponent } from './_components/search/search.component';
import { SearchResultsComponent } from './_pages/search-results/search-results.component';
import { UserCardComponent } from './_components/user-card/user-card.component';
import { BackButtonComponent } from './_components/back-button/back-button.component';
import { MasonryDirective } from './_directives/masonry.directive';

@NgModule({
  declarations: [
    AppComponent,
    // AlertComponent,
    UserComponent,
    ListComponent,
    ProfileComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    CreateListComponent,
    YourListComponent,
    SearchComponent,
    SearchResultsComponent,
    UserCardComponent,
    MasonryDirective,
  ],
  imports: [
    TransferHttpCacheModule,
    BrowserModule.withServerTransition({ appId: 'ListetApp' }),
    ActionButtonModule,
    AlertComponent,
    BackButtonComponent,
    BrowserAnimationsModule,
    CharacterCounterModule,
    DeadlineModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
  ],
  exports: [MasonryDirective],
  providers: [ListDataService, SearchDataService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
