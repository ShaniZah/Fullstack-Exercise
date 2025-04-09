import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, NgFor],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.map((user) => {
        user.bmi = this.calculateBMI(user.height, user.weight);
        const { avg, states } = this.analyzeHeartRate(user.heartRate);
        user.avgHeartRate = avg;
        user.heartRateStatuses = this.extractFirstMinuteOfStates(states);
        return user;
      });
    });
  }

  private calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(2);
  }

  private analyzeHeartRate(data: string): {
    avg: number;
    states: { minute: number; state: string }[];
  } {
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

  private extractFirstMinuteOfStates(
    states: { minute: number; state: string }[]
  ): { minute: number; state: string }[] {
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
