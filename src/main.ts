import { APP_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgOptimizedImage } from '@angular/common';
import { IconsModule } from './app/_modules/icons/icons.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeadlineModule } from './app/shared/deadline/deadline.module';
import { CharacterCounterModule } from './app/shared/character-counter/character-counter.module';
import { ActionButtonModule } from './app/shared/action-button/action-button.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { UsersService } from './app/_services/users.service';
import { SearchDataService } from './app/shared/search-data.service';
import { ListDataService } from './app/shared/list-data.service';
// import { enableDebugTools } from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        AppRoutingModule,
        ActionButtonModule,
        CharacterCounterModule,
        DeadlineModule,
        ReactiveFormsModule,
        FormsModule,
        IconsModule,
        NgOptimizedImage
      ),
      ListDataService,
      SearchDataService,
      UsersService,
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
      {
        provide: APP_ID,
        useValue: 'ListetApp',
      },
    ],
  })
    // .then(module => enableDebugTools(module.injector.get(ApplicationRef).components[0]))
    .catch(err => console.error(err));
});
