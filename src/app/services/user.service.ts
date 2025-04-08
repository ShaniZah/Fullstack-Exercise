import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { tokenGetter } from '../app.config';

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
    return this.http.get<User[]>(`${environment.url}/data/GetAll`, {withCredentials:true});
  }
}
