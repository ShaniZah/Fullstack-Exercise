import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportComponent } from '../report/report.component';
import { UploadComponent } from "../upload/upload.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserDataComponent } from "../user-data/user-data.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatExpansionModule, ReportComponent, UploadComponent, UserDataComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  constructor(private router: Router, private authService : AuthService) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout failed', err)
    });
  }
}
