import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';


// Components
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert/alert.component';
import { BackButtonComponent } from './_components/back-button/back-button.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ListComponent } from './_components/list/list.component';
import { ListCommentsComponent } from './_components/list-comments/list-comments.component';
import { ListItemsComponent } from './_components/list-items/list-items.component';
import { ListHeaderComponent } from './_components/list-header/list-header.component';
import { NavComponent } from './_components/nav/nav.component';
import { UserComponent } from './_components/user/user.component';

// Guards
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { IconsModule } from './_modules/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Service
import {ListDataService} from './shared/list-data.service';

// Pages
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { HomeComponent } from './_pages/home/home.component';
import { ListDetailsComponent } from './_pages/list-details/list-details.component';
import { LoginComponent } from './_pages/login/login.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { RegisterComponent } from './_pages/register/register.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { VerifyAccountComponent } from './_components/verify-account/verify-account.component';
import { CreateListComponent } from './_pages/create-list/create-list.component';
import { CreateCommentComponent } from './_components/create-comment/create-comment.component';
import { AddItemComponent } from './_components/add-item/add-item.component';
import { DeadlineComponent } from './_components/deadline/deadline.component';

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
    ListDetailsComponent,
    ListHeaderComponent,
    ListCommentsComponent,
    ListItemsComponent,
    NotFoundComponent,
    BackButtonComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    CreateListComponent,
    CreateCommentComponent,
    AddItemComponent,
    DeadlineComponent
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
  providers: [GuestGuard, AuthGuard, ListDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
