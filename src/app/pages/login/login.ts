import { Component, OnInit } from '@angular/core';
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
export class Login implements OnInit {
  email = ''
  password = ''

  login_message: string[] = [];
  message_type = 'error'
  submit = false;

  constructor (
    private nurseService: NurseData,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    if (this.nurseService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    if (this.email.length <= 0) {
      this.login_message.push('Email cannot be empty.')
    }

    if (!this.nurseService.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly.')
    }

    if (this.password.length < 8) {
      this.login_message.push('Password must be at least 8 characters long.')
    }

    if (this.login_message.length > 0) {
      return;
    }

    /**
     * This method does the signing process for the nurse, depending on what it returns, it will either
     * spit out an error or reroute the user to home.
     */
    this.nurseService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        this.login_message = [error?.message];
      }
    });
  }

}