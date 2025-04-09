import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoginRequest, AuthService } from '../services/auth.service';
import { appRoutes } from '../consts';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private lockTimer: any;
  locked = false;
  countdown = 0;

  login() {
    if (this.locked) return;
    const loginInfo: LoginRequest = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(loginInfo).subscribe({
      next: () => {
        this.errorMessage = '';
        clearInterval(this.lockTimer);
        this.locked = false;
        this.router.navigate([appRoutes.root, appRoutes.dashboard]);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else if (error.status === 423) {
          this.errorMessage = `Too many attempts. Try again in 1 minute`;
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      },
    });
  }

  startLockoutTimer(seconds: number) {
    this.locked = true;
    this.countdown = seconds;
    this.errorMessage = `Too many attempts. Try again in ${this.countdown}s`;

    this.lockTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.lockTimer);
        this.locked = false;
        this.errorMessage = '';
      } else {
        this.errorMessage = `Too many attempts. Try again in ${this.countdown}s`;
      }
    }, 1000);
  }
}
