import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NurseData } from '../../nursedata';
import { Nurse } from '../../nurse';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register implements OnInit {
  name: string = '';
  surname: string = '';
  fullname: string = '';
  email: string = '';
  password: string = '';
  imageUrl: string = '';

  submit: boolean = false;
  login_message: string[] = [];
  message_type: string = 'error';

  constructor (
    private nurseService: NurseData,
    private router: Router,
  ) {}

  ngOnInit() {
    if(this.nurseService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  handleFormSubmit() {
    this.submit = true;
    this.login_message = [];

    if (this.name.length <= 0) {
      this.login_message.push('Name cannot be empty.')
    }

    if (this.email.length <= 0) {
      this.login_message.push('Email cannot be empty.')
    }

    if (!this.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly.')
    }

    if (this.password.length < 8) {
      this.login_message.push('Password must be at least 8 characters long.')
    }

    if (this.imageUrl && !this.validateImageUrl(this.imageUrl)) {
      this.login_message.push('Image URL formatted incorrectly. URLs should end in .png, .jpg, .jpeg')
    }

    if (this.login_message.length > 0) {
      return;
    }

    this.fullname = this.name + ' ' + this.surname;
    // Building a new nurse object for the registration.
    const nurse: Nurse =
    {
      user: this.nameToUsername(this.fullname),
      name: this.fullname,
      email: this.email,
      password: this.password,
      working: true,
      imageUrl: this.imageUrl
    }

    const success = this.nurseService.register(nurse).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.login_message = [error?.message];
      }
    });

    // Only current message it should return is matching emails, this can be scaled to return other messages.
    if (!success) {
      this.login_message = ["There was an error processing your request."]; // Mask the true error as it can reveal info to attackers.
      return;
    }
  }

  validateEmail(email: string): boolean {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    );
  }

  validateImageUrl(url: string): boolean {
  return (
      /^(https?:\/\/.*\.(?:png|jpe?g))$/i.test(url)
    );
  }

  nameToUsername(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '.'); 
}
}
