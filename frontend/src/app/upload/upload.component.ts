import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})

export class UploadComponent {
  selectedFile: File | null = null;
  uploadProgress = 0;
  uploadResult: any = null;
  error = '';

  constructor(private filesService: FileService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.name.endsWith('.csv')) {
      this.error = 'Only CSV files are allowed.';
      return;
    }

    this.error = '';
    this.selectedFile = file;
  }

  uploadFile() {
    if (!this.selectedFile) return;

    this.uploadProgress = 0;
    this.uploadResult = null;
    this.error = '';

    this.filesService.uploadFile(this.selectedFile).subscribe({
      
      error: (err) => {
        this.error = 'Upload failed: ' + err.message;
      }
    });
  }
}
