import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Observable, throwError, BehaviorSubject, catchError, switchMap, filter, take } from 'rxjs';
  import { inject } from '@angular/core';
  import { AuthService } from '../services/auth.service';
  import { Router } from '@angular/router';
  
  export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); // Injete o AuthService
    const router = inject(Router); // Injete o Router
  
    const accessToken = localStorage.getItem('accessToken');
  
    // Adiciona o token às requisições autorizadas
    if (accessToken && !isAuthRequest(req.url)) {
      req = addTokenToRequest(req, accessToken);
    }
  
    return next(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 403 &&
          !isAuthRequest(req.url)
        ) {
          return handle401Error(req, next, authService, router);
        }
        return throwError(() => error);
      })
    );
  };
  
  // Funções auxiliares
  const isAuthRequest = (url: string): boolean => {
    return url.includes('/login') || url.includes('/register');
  };
  
  const addTokenToRequest = (request: HttpRequest<any>, token: string): HttpRequest<any> => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  const handle401Error = (
    request: HttpRequest<any>,
    next: HttpHandlerFn,
    authService: AuthService,
    router: Router
  ): Observable<HttpEvent<any>> => {
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (!refreshToken) {
      router.navigate(['/login']);
      return throwError(() => new Error('No refresh token available'));
    }
  
    return authService.refreshToken(refreshToken).pipe(
      switchMap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        const newRequest = addTokenToRequest(request, res.accessToken);
        return next(newRequest);
      }),
      catchError((error) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  };