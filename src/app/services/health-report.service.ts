import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
