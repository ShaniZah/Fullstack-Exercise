import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private URL = 'https://localhost:7200';
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(`${this.URL}/Upload`, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Invalid credentials'));
    }
    return throwError(() => new Error('An unexpected error occurred'));
  }
}
