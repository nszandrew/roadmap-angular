import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import correto

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}