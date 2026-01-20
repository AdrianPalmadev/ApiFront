import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Nurse } from '../../nurse';
import { NurseData } from '../../nursedata';

@Component({
  selector: 'app-index',
  imports: [Header],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index implements OnInit {
  nurses: Nurse[] = [];

  errorMessage: string | null = null;
  loading = true;

  constructor(private nurseservice: NurseData) {}

  ngOnInit(): void {
    this.nurseservice.getAllNurses().subscribe({
      next: (result) => {
        this.nurses = result;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Error al cargar las nurses. Inténtalo más tarde.';
        this.loading = false;
      },
    });
  }
}
