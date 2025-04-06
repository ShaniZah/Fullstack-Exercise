import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  ID: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Height: number;
  Weight: number;
  HeartRate: string;
  bmi?: number;
  avgHeartRate?: number;
  heartRateStatuses?: { minute: number; state: string }[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://people-1a8f.restdb.io/rest/test-db';
  private apiKey = '13fb233da679d57d63f5b297c46474d711881';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: { 'x-apikey': this.apiKey }
    });
  }
}
