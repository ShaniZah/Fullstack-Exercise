import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginInfo: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.url}/Auth/Login`, loginInfo);
  }

  updateJwtToken(jwtToken: string) {
    localStorage.setItem(environment.access_token, jwtToken);
  }
}

type LoginResponse = { token: string };
