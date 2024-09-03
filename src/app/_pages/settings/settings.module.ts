import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from '../../_components/settings-profile/settings-profile.component';
import { SettingsDeleteAccountComponent } from '../../_components/settings-delete-account/settings-delete-account.component';
import { SettingsPasswordComponent } from '../../_components/settings-password/settings-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../../_modules/icons/icons.module';
import { provideHttpClient } from '@angular/common/http';
// import { AlertComponent } from 'src/app/_components/alert/alert.component';
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideHttpClient()],
    children: [
      { path: '', component: SettingsProfileComponent },
      { path: 'change-password', component: SettingsPasswordComponent },
      { path: 'delete-account', component: SettingsDeleteAccountComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    SettingsComponent,
    SettingsDeleteAccountComponent,
    SettingsPasswordComponent,
    SettingsProfileComponent,
  ],
  exports: [RouterModule],
})
export class SettingsModule {}
