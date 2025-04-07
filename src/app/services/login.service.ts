import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL = 'https://localhost:7200';
  constructor(private http: HttpClient) {}

  login(loginInfo: LoginRequest): Observable<string> {
    return this.http.post(`${this.URL}/Login/Login`, loginInfo, { responseType: 'text' }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Invalid credentials'));
    }
    return throwError(() => new Error('An unexpected error occurred'));
  }
}
