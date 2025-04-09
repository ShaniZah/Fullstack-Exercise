import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIs } from '../consts';

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
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIs.getData, {withCredentials:true});
  }
}
