import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, MatSnackBarModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}
  

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.token;
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        console.log("Token armazenado:", localStorage.getItem('accessToken'));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        let errorMessage = 'Ocorreu um erro inesperado.';
      
      if (err.error && typeof err.error === 'object') {
        if (err.error.message) {
          errorMessage = err.error.message;
        } else if (err.error.error) {
          errorMessage = err.error.error;
        } else {
          errorMessage = JSON.stringify(err.error);
        }
      } else if (typeof err.error === 'string') {
        errorMessage = err.error;
      }
      
      this.snackBar.open(errorMessage, 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'] 
      });
      }
    });
  }
}
