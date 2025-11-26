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
  enfermeros = [
    {
      id: 2,
      usuario: 'ana.garcia',
      nombre: 'Marc Pepe',
      email: 'ana.garcia@example.com',
      trabajando: true,
    },
    {
      id: 3,
      usuario: 'maria.lopez',
      nombre: 'Mar\u00eda L\u00f3pez',
      email: 'maria.lopez@example.com',
      trabajando: true,
    },
    {
      id: 4,
      usuario: 'laura.martinez',
      nombre: 'Laura Mart\u00ednez',
      email: 'laura.martinez@example.com',
      trabajando: true,
    },
  ];
  contador = 0;
  click_secret() {
    this.contador += 1;
  }
}
