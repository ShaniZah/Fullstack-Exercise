import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadInProgress:boolean = false;
  uploadResult: any = null;
  error = '';

  constructor(private filesService: FileService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.name.endsWith('.csv')) {
      this.error = 'Only CSV files are allowed.';
      this.selectedFile = null;
      return;
    }

    this.error = '';
    this.selectedFile = file;
    this.uploadResult = null;
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.uploadInProgress = true;
    this.uploadResult = null;
    this.error = '';

    this.filesService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadResult = res;
        this.uploadInProgress = false;
      },
      error: (err) => {
        this.error = 'Upload failed: ' + err.message;
        this.uploadInProgress = false;
      },
    });
  }
}
