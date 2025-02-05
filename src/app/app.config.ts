import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor'; // Importe a função
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // Use a função aqui
    ),

    { provide: AuthService, useClass: AuthService },
    { provide: Router, useClass: Router },
  ]
};