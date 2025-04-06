import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HealthReason, HealthReportService } from '../services/health-report.service';

@Component({
  selector: 'app-report',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  data: HealthReason[] = [];

  level1Options: HealthReason[] = [];
  level2Options: HealthReason[] = [];
  level3Options: HealthReason[] = [];

  selectedLevel1: HealthReason | null = null;
  selectedLevel2: HealthReason | null = null;
  selectedLevel3: HealthReason | null = null;

  message = '';

  private reportService = inject(HealthReportService);

  ngOnInit(): void {
    this.reportService.getHealthReasons().subscribe({
      next: (res) => {
        this.data = res.values;
        this.level1Options = this.data;
      },
      error: (err) => {
        console.error('Failed to load health_reasons.json:', err);
      }
    });
  }

  onLevel1Change() {
    this.selectedLevel2 = null;
    this.selectedLevel3 = null;
    this.level2Options = this.selectedLevel1?.values || [];
    this.level3Options = [];
  }

  onLevel2Change() {
    this.selectedLevel3 = null;
    this.level3Options = this.selectedLevel2?.values || [];
  }

  submitReport() {
    if (this.selectedLevel1 && this.selectedLevel2 && (this.level3Options.length === 0 || this.selectedLevel3)) {
      this.message = 'Your request is being processed.';
    } else {
      this.message = 'Please complete all dropdowns.';
    }
  }
}