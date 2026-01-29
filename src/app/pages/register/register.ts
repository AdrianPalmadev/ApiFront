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

    if (!this.nurseService.validateEmail(this.email)) {
      this.login_message.push('Email formatted incorrectly.')
    }

    if (this.password.length < 8) {
      this.login_message.push('Password must be at least 8 characters long.')
    }

    if (this.imageUrl && !this.nurseService.validateImageUrl(this.imageUrl)) {
      this.login_message.push('Image URL formatted incorrectly. URLs should end in .png, .jpg, .jpeg')
    }

    if (this.login_message.length > 0) {
      return;
    }

    this.fullname = this.name + ' ' + this.surname;
    // Building a new nurse object for the registration.
    const nurse: Nurse =
    {
      user: this.nurseService.nameToUsername(this.fullname),
      name: this.fullname,
      email: this.email,
      password: this.password,
      working: true,
      imageUrl: this.imageUrl
    }

    /** 
     * This method does the registering process, depending on what it returns, it will show an error or
     * navigate straight to login so the nurse can access the services in the page.
    */
   
    this.nurseService.register(nurse).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.login_message = [error?.message];
      }
    });
  }
}
