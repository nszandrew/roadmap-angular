// app.config.server.ts (para o lado do servidor/SSR)
import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfigServer: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter(appRoutes),
    provideHttpClient(),
    // ...
  ],
};
