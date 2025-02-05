// app.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { AuthService } from './services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Injeta o ID da plataforma
  ) {}

  title = 'frontend-roadmap-odyssey';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // Verifica se é o navegador
      this.checkAuthentication();
    }
  }

  checkAuthentication() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      this.authService.verifyToken(accessToken).subscribe({
        next: (isValid) => {
          if (isValid) {
            this.router.navigate(['/home']);
          } else {
            // Token expirado, tenta renovar com o refreshToken
            this.authService.refreshToken(refreshToken).subscribe({
              next: (res) => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                this.router.navigate(['/home']);
              },
              error: () => {
                // Se a renovação falhar, redireciona para o login
                this.router.navigate(['/login']);
              },
            });
          }
        },
        error: () => {
          // Se a verificação falhar, redireciona para o login
          this.router.navigate(['/login']);
        },
      });
    } else {
      // Se não houver tokens, redireciona para o login
      this.router.navigate(['/login']);
    }
  }
}

