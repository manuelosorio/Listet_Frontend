import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from './action-button.component';
import { IconsModule } from '../../_modules/icons/icons.module';



@NgModule({
  declarations: [
    ActionButtonComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ActionButtonComponent
  ]
})
export class ActionButtonModule { }
