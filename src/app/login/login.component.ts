import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoginRequest, LoginService } from '../services/login.service';
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
  constructor(private router: Router, private loginService : LoginService) {}

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private failedAttempts = 0;
  private lockTimer: any;
  locked = false;
  countdown = 0;

  login() {
    if (this.locked) return;

    const loginInfo: LoginRequest = {
      username: this.username,
      password: this.password,
    };


    this.loginService.login(loginInfo).subscribe({
      next: () => {
        this.errorMessage = '';
        this.failedAttempts = 0;
        clearInterval(this.lockTimer);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.failedAttempts++;
        if (this.failedAttempts >= 3) {
          this.locked = true;
          this.countdown = 60;
          this.errorMessage = `Locked. Try again in ${this.countdown}s.`;

          this.lockTimer = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
              clearInterval(this.lockTimer);
              this.failedAttempts = 0;
              this.locked = false;
              this.errorMessage = '';
            } else {
              this.errorMessage = `Locked. Try again in ${this.countdown}s.`;
            }
          }, 1000);
        } else {
          this.errorMessage = `Invalid credentials (${this.failedAttempts}/3)`;
        }
      },
    });
  }

}
