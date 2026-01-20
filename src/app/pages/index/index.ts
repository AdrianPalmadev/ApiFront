import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
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

  constructor(private nurseservice: NurseData) {}

  ngOnInit(): void {
    this.nurseservice.getAllNurses()
      .subscribe(result => {
        this.nurses = result;
        console.log(result);
      });
  }
}
