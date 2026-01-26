import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { NurseData } from '../../nursedata';
import { Nurse } from '../../nurse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  constructor(private nurseservice: NurseData) {}

  searchName = '';
  nurses: Nurse[] = [];
  errorMessage: string | null = null;

  searchNurse() {
    this.errorMessage = null;

    this.nurseservice.searchByName(this.searchName).subscribe({
      next: (result) => {
        this.nurses = result;
        console.log(result);
      },
      error: () => {
        this.nurses = [];
        this.errorMessage = 'No se encontró ninguna nurse con ese nombre';
      },
    });
  }
}
