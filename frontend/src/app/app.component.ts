import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MaterialModules } from './material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MaterialModules,
  ],
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet />`,
})
export class AppComponent {
  title = 'FullstackExercise';
}
