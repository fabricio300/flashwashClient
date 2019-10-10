import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {
  lavandrias=[
    {
      id:1,
      nombre:'lavandería 1',
      imagene:'../../../assets/iconos/shutterstock_422824102.jpg',
      precioporKilo:'40$'
    },
    {
      id:2,
      nombre:'lavandería 2',
      imagene:'../../../assets/iconos/flaswash.png',
      precioporKilo:'30$'
    },
    {
      id:1,
      nombre:'lavandería 3',
      imagene:'../../../assets/iconos/700x420_lavanderia-autoservicio.jpg',
      precioporKilo:'50$'
    }
  ]


  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }


  irALavanderia(){
    this.router.navigate(['/lavanderia'])
  }

}
