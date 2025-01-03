// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
//import { provideClientHydration } from '@angular/platform-browser';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
    //provideClientHydration(), provideAnimationsAsync('noop'),
    // provideHttpClient() - se não estiver presente, inclua também
  ],
};
