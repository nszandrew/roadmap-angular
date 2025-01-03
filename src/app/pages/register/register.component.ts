import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatSnackBarModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res) => {
        alert('User created successfully!');
        this.router.navigate(['/login']);
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
