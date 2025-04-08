import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { User, UserService } from '../services/user.service';
import { ReportComponent } from '../report/report.component';
import { UploadComponent } from "../upload/upload.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatExpansionModule, ReportComponent, UploadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  users: User[] = [];
  private userService = inject(UserService);
  constructor(private router: Router, private authService : AuthService) {} // is there a difference?

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(user => {
        user.bmi = this.calculateBMI(user.height, user.weight);
        const { avg, states } = this.analyzeHeartRate(user.heartRate);
        user.avgHeartRate = avg;
        user.heartRateStatuses = this.extractFirstMinuteOfStates(states);
        return user;
      });
    });
  }

  onLogout() {
    console.log("logging out...");
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
    // update guard
  }

  calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(2);
  }

  analyzeHeartRate(data: string): { avg: number; states: { minute: number; state: string }[] } {
    const samples = data.split(';').map(Number);
    const states: { minute: number; state: string }[] = [];

    samples.forEach((value, i) => {
      let state = 'awake';
      if (value < 70) state = 'sleeping';
      else if (value >= 90) state = 'workout';
      states.push({ minute: i + 1, state });
    });

    const average = +(
      samples.reduce((sum, curr) => sum + curr, 0) / samples.length
    ).toFixed(2);

    return { avg: average, states };
  }

  extractFirstMinuteOfStates(states: { minute: number; state: string }[]): { minute: number; state: string }[] {
    const firstEntries: { minute: number; state: string }[] = [];
    let lastState: string | null = null;

    for (const entry of states) {
      if (entry.state !== lastState) {
        firstEntries.push(entry);
        lastState = entry.state;
      }
    }

    return firstEntries;
  }

}