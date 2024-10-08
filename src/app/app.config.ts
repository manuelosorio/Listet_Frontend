import {
  APP_ID,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { ActionButtonModule } from '@shared/action-button/action-button.module';
import { CharacterCounterModule } from '@shared/character-counter/character-counter.module';
import { DeadlineModule } from '@shared/deadline/deadline.module';
import { ListDataService } from '@shared/list-data.service';
import { SearchDataService } from '@shared/search-data.service';
import { IconsModule } from '@modules/icons/icons.module';
import { UsersService } from '@services/users.service';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
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
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideClientHydration(withNoHttpTransferCache()),
    {
      provide: APP_ID,
      useValue: 'ListetApp',
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
