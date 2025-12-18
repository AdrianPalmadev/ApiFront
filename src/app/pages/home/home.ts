import { Component } from '@angular/core';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-home',
  imports: [Header],
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
