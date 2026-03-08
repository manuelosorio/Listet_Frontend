import { provideServerRendering } from '@angular/ssr';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(withNoHttpTransferCache()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
