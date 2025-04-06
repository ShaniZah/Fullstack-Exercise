import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { User, UserService } from '../services/user.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatExpansionModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  users: User[] = [];
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(user => {
        user.bmi = this.calculateBMI(user.Height, user.Weight);
        const { avg, states } = this.analyzeHeartRate(user.HeartRate);
        user.avgHeartRate = avg;
        user.heartRateStatuses = states;
        return user;
      });
    });
  }

  logout() {
    window.location.href = '/';
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

    const avg = +(
      samples.reduce((sum, curr) => sum + curr, 0) / samples.length
    ).toFixed(2);

    return { avg, states };
  }
}