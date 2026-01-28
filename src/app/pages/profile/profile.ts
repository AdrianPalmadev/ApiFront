import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NurseData } from '../../nursedata';
import { Header } from '../../components/header/header';
import { Nurse } from '../../nurse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  nurse!: Nurse;
  originalNurse!: Nurse;
  editMode = false;

  constructor(
    private nurseService: NurseData,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.nurseService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const currentNurse = this.nurseService.getCurrentNurse();

    if (!currentNurse) {
      this.router.navigate(['/login']);
      return;
    }

    this.nurse = { ...currentNurse };
    this.originalNurse = { ...currentNurse };
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.nurse = { ...this.originalNurse };
    }
  }

  saveProfile(): void {
    if (!this.nurse.id) {
      return;
    }

    const changes: Partial<Nurse> = {};

    if (this.nurse.name !== this.originalNurse.name) {
      changes.name = this.nurse.name;
    }

    if (this.nurse.user !== this.originalNurse.user) {
      changes.user = this.nurse.user;
    }

    if (this.nurse.email !== this.originalNurse.email) {
      changes.email = this.nurse.email;
    }

    if (this.nurse.password && this.nurse.password !== this.originalNurse.password) {
      changes.password = this.nurse.password;
    }

    if (this.nurse.working !== this.originalNurse.working) {
      changes.working = this.nurse.working;
    }

    if (this.nurse.imageUrl !== this.originalNurse.imageUrl) {
      changes.imageUrl = this.nurse.imageUrl;
    }

    if (Object.keys(changes).length === 0) {
      this.editMode = false;
      return;
    }

    this.nurseService.editNurse(this.nurse.id, changes as Nurse).subscribe({
      next: () => {
        this.originalNurse = { ...this.nurse };
        this.editMode = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
