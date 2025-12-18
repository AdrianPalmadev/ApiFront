import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NurseData } from '../../nursedata';

@Component({
  selector: 'app-nurse-login',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = ''
  password = ''

  login_message: string[] = [];
  message_type = 'error'
  submit = false;

  constructor (
    private nurseData: NurseData,
    private router: Router
  ) {}
  
  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    if (this.email.length <= 0) {
      this.login_message.push('Email cannot be empty.')
    }

    if (!this.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly.')
    }

    if (this.password.length < 8) {
      this.login_message.push('Password must be at least 8 characters long.')
    }

    if (this.login_message.length > 0) {
      return;
    }

    // Login method returns a boolean, this is used here to verify if the login went smoothly.
    // The user is automatically logged in, as the method already does the process before returning true or false.
    const success = this.nurseData.login(this.email, this.password);

    if (!success) {
      this.login_message = ["Invalid email or password."]
      return;
    }

    // After everything, it returns home.
    this.router.navigate(['']);
  }

  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }

}