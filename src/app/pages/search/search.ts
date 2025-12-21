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
  term: string = '';

  constructor(
    public nurseService: NurseData
  ) {}

  get filteredNurses(): Nurse[]
  {
    const term = this.term.toLowerCase();

    return this.nurseService.getNurses().filter(n => n.name.toLowerCase().includes(term));
  }
}
