import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  enfermeros = [
    {
      id: 2,
      usuario: 'ana.garcia',
      nombre: 'Marc Pepe',
      email: 'ana.garcia@example.com',
      trabajando: true,
      img: null,
    },
    {
      id: 3,
      usuario: 'maria.lopez',
      nombre: 'Mar\u00eda L\u00f3pez',
      email: 'maria.lopez@example.com',
      trabajando: true,
      img: null,
    },
    {
      id: 4,
      usuario: 'laura.martinez',
      nombre: 'Laura Mart\u00ednez',
      email: 'laura.martinez@example.com',
      trabajando: true,
      img: '/img/boo.jpg',
    },
  ];
}
