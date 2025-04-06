import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModules } from './material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MaterialModules,
    LoginComponent,
    DashboardComponent
  ],
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet />`
})
export class AppComponent {
  title = 'FullstackExercise';
}
