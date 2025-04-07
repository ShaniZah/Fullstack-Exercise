import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  heartRate: string;
  bmi?: number;
  avgHeartRate?: number;
  heartRateStatuses?: { minute: number; state: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiUrl = 'https://people-1a8f.restdb.io/rest/test-db';
  // private apiKey = '67f2601f7be75e1adbbab34f';

  private URL = 'https://localhost:7200/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/data/GetAll`).pipe(tap(console.log)); // what is tap?
  }
}
