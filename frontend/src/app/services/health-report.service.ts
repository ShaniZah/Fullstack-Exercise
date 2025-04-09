import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../consts';
import { HealthReason } from '../report/reports.types';

@Injectable({
  providedIn: 'root',
})
export class HealthReportService {
  constructor(private http: HttpClient) {}

  getHealthReasons(): Observable<{ values: HealthReason[] }> {
    return this.http.get<{ values: HealthReason[] }>(
      'assets/health_reasons.json',
    );
  }

  submitReport(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(APIs.sendReport, {});
  }
}
