/*
 * Copyright (c) 2020 wynfred
 * https://github.com/wynfred/ngx-masonry
 */
import { NgModule } from '@angular/core';
import { NgxMasonryComponent } from './ngx-masonry.component';
import { NgxMasonryDirective } from './ngx-masonry.directive';

@NgModule({
  imports: [],
  declarations: [NgxMasonryComponent, NgxMasonryDirective],
  exports: [NgxMasonryComponent, NgxMasonryDirective]
})
export class NgxMasonryModule {}
