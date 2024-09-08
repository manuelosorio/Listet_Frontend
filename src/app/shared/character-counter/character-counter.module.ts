import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCounterComponent } from './character-counter.component';
import { IconsModule } from '@modules/icons/icons.module';

@NgModule({
  imports: [CommonModule, IconsModule, CharacterCounterComponent],
  exports: [CharacterCounterComponent],
})
export class CharacterCounterModule {}
