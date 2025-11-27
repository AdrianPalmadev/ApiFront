import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  url_nurse='/img/nurse.jpg';
  url_boo='/img/boo.jpg'
  contador = 0;
  click_secret() {
    this.contador += 1;
  }
}
