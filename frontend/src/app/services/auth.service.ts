import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { APIs } from '../consts';

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
    return this.http.post<LoginResponse>(APIs.login, loginInfo);
  }

  logout(): Observable<any> {
    return this.http.post(APIs.logout, {});
  }

  validateToken(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(APIs.validateToken).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}

type LoginResponse = { message: string };
