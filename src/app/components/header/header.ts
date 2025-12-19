import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NurseData } from '../../nursedata';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor (
    public nurseService: NurseData
  ) {}

  logout() {
    this.nurseService.logout();
  }
}
