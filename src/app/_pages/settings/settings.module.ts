import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from '../../_components/settings-profile/settings-profile.component';
import { SettingsDeleteAccountComponent } from '../../_components/settings-delete-account/settings-delete-account.component';
import { SettingsPasswordComponent } from '../../_components/settings-password/settings-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../../_modules/icons/icons.module';
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', component: SettingsProfileComponent },
      { path: 'change-password', component: SettingsPasswordComponent },
      { path: 'delete-account', component: SettingsDeleteAccountComponent },
    ]
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
    ReactiveFormsModule,
    FormsModule,
    IconsModule
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsModule {
}
