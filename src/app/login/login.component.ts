import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  errorMessage: string = '';

  public LoginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router ) {}

  login(): void {
    // Logic to update the user will go here, but for now, we'll just log the values
      if (this.authService.login(this.LoginForm.controls.username.value as string, this.LoginForm.controls.password.value as string)) {
        this.router.navigate(['/employee']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
      
  }
}
