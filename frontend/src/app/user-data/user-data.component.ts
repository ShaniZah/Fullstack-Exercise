import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSpinner } from '@angular/material/progress-spinner';
import { UserService } from '../services/user.service';
import { HeartRateInfo, HeartRateStatus, User } from './user-data.types';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatSpinner],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit {
  users: User[] = [];
  error: boolean = false;
  showMore: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map((user) => {
          user.bmi = this.calculateBMI(user.height, user.weight);
          const { avg, states } = this.analyzeHeartRate(user.heartRate);
          user.avgHeartRate = avg;
          user.heartRateStatuses = this.extractFirstMinuteOfStates(states);
          return user;
        });
      },
      error: () => {
        this.error = true;
      },
    });
  }

  private calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(2);
  }

  private analyzeHeartRate(data: string): HeartRateInfo {
    const samples = data.split(';').map(Number);
    const states: HeartRateStatus[] = [];

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

  private extractFirstMinuteOfStates(
    states: HeartRateStatus[],
  ): HeartRateStatus[] {
    const firstEntries: HeartRateStatus[] = [];
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
