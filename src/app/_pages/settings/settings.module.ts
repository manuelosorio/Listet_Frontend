import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from '../../_components/settings-profile/settings-profile.component';
import { SettingsDeleteAccountComponent } from '../../_components/settings-delete-account/settings-delete-account.component';
import { SettingsPasswordComponent } from '../../_components/settings-password/settings-password.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsDeleteAccountComponent,
    SettingsPasswordComponent,
    SettingsProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsModule {
}
