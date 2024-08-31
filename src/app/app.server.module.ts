import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@angular/ssr';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
@NgModule({
  imports: [AppModule, ServerModule, HttpClientModule, TransferHttpCacheModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
