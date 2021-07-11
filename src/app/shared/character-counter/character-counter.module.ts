import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCounterComponent } from './character-counter.component';
import { IconsModule } from '../../_modules/icons/icons.module';



@NgModule({
  declarations: [CharacterCounterComponent],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    CharacterCounterComponent
  ]
})
export class CharacterCounterModule { }
