import { Component } from '@angular/core';
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

  selectedLevels: (HealthReason | null)[] = [null];
  levelOptions: HealthReason[][] = [[]];

  message = '';

  constructor(private reportService: HealthReportService) {}

  ngOnInit(): void {
    this.reportService.getHealthReasons().subscribe({
      next: (res) => {
        this.data = res.values;
        this.levelOptions[0] = this.data;
      },
      error: (err) => {
        console.error('Failed to load health_reasons.json:', err);
      }
    });
  }

  onLevelChange(levelIndex: number): void {
    const currentSelection = this.selectedLevels[levelIndex];

    // reset deeper levels (in case of re-selection)
    this.selectedLevels = this.selectedLevels.slice(0, levelIndex + 1);
    this.levelOptions = this.levelOptions.slice(0, levelIndex + 1);

    if (currentSelection?.values?.length) {
      this.selectedLevels.push(null);
      this.levelOptions.push(currentSelection.values); // add next dropdown options
    }
  }

  submitReport(): void {
    for (let i = 0; i < this.selectedLevels.length; i++) {
      const selected = this.selectedLevels[i];
      const hasChildren = !!selected?.values?.length;

      if (!selected || (hasChildren && !this.selectedLevels[i + 1])) {
        this.message = 'Please complete all dropdowns.';
        return;
      }
    }

    this.message = 'Sending...';
    this.reportService.submitReport().subscribe({
      next: (res) => {
        this.message = res.message;
      },
      error: (err) => {
        console.error('Error submitting report:', err);
        this.message = 'An error occurred while sending your report.';
      }
    });
  }
}
