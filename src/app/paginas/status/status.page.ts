import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  efectos=new Efectos()

  pedidos=[
    {
      id:1,
      nombre:'Nombre de lavanderia',
      hora:'11:00 pm',
      status: 'En lavanderia',
      visto: false,
      icon:this.efectos.enLavanderia,
      servicios:[
        'servicio 1',
        'servicio 2',
        'servicio 3',
        'servicio 4',
        'servicio 5'
      ]
    },

    {
      id:2,
      nombre:'Nombre de lavanderia 2',
      hora:'11:00 pm',
      status: 'En entraga',
      visto: false,
      icon:this.efectos.moto1,
      servicios:[
        'servicio 1',
        'servicio 2',
        'servicio 3',
        'servicio 4',
        'servicio 5'
      ]
    },

    {
      id:3,
      nombre:'Nombre de lavanderia 3',
      hora:'11:00 pm',
      status: 'En camino',
      visto: false,
      icon:this.efectos.moto0,
      servicios:[
        'servicio 1',
        'servicio 2',
        'servicio 3',
        'servicio 4',
        'servicio 5',
        'servicio 6',
        'servicio 7'
      ]
    },


    {
      id:4,
      nombre:'Nombre de lavanderia 4',
      hora:'11:00 pm',
      status: 'A lavandería',
      visto: false,
      icon:this.efectos.moto2,
      servicios:[
        'servicio 1',
        'servicio 2',
        'servicio 3',
        'servicio 4',
        'servicio 5',
        'servicio 6',
        'servicio 7'
      ]
    }


  ]

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  irAlavanderia(){
    this.router.navigate(['/lavanderia'])
  }

  irAStatus(){
    this.router.navigate(['/seguimiento'])
  }
}
