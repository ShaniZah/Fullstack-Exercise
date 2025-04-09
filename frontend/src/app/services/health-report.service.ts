import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIs } from '../consts';

export interface HealthReason {
  name: string;
  values?: HealthReason[];
}

@Injectable({
  providedIn: 'root'
})
export class HealthReportService {
  constructor(private http: HttpClient) {}

  getHealthReasons(): Observable<{ values: HealthReason[] }> {
    return this.http.get<{ values: HealthReason[] }>('assets/health_reasons.json');
  }

  submitReport(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(APIs.sendReport, {}, {withCredentials:true}); 
  }
  
}
