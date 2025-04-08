import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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
    return this.http.post<LoginResponse>(`${environment.url}/Auth/Login`, loginInfo, {withCredentials:true});
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.url}/Auth/Logout`, {}, {
      withCredentials: true
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(
      `${environment.url}/Auth/ValidateToken`,
      { withCredentials: true }
    ).pipe(
      map(() => true),
      catchError(() => of(false)) //  401/403/..., see as invalid
    );
  }
}

type LoginResponse = { token: string };
