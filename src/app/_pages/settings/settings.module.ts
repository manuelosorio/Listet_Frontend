import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from '@components/settings-profile/settings-profile.component';
import { SettingsDeleteAccountComponent } from '@components/settings-delete-account/settings-delete-account.component';
import { SettingsPasswordComponent } from '@components/settings-password/settings-password.component';
import { IconsModule } from '@modules/icons/icons.module';

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
