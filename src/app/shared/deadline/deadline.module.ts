import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeadlineComponent } from './deadline.component';
import { IconsModule } from '../../_modules/icons/icons.module';



@NgModule({
    imports: [
        CommonModule,
        IconsModule,
        DeadlineComponent
    ],
    exports: [
        DeadlineComponent
    ]
})
export class DeadlineModule { }
