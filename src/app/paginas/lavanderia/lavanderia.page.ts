import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { Router ,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lavanderia',
  templateUrl: './lavanderia.page.html',
  styleUrls: ['./lavanderia.page.scss'],
})
export class LavanderiaPage implements OnInit {

  imagenes=[
    '../../../assets/iconos/shutterstock_422824102.jpg',
    '../../../assets/iconos/700x420_lavanderia-autoservicio.jpg',
    '../../../assets/iconos/20180626143642-lavanderia.jpeg',
    '../../../assets/iconos/exe.jpg',
    '../../../assets/iconos/flaswash.png'
  ]

  servicios=[
    {
      servicio:'Lavado de ropa',
      precio: 30,
      visto: false,
      elegido:false,
      unidad: 'Kilo'
    },
    {
      servicio:'Planchado',
      precio: 5,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },
    {
      servicio:'Ropa de ceda',
      precio: 20,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },

    {
      servicio:'Ropa de cama',
      precio: 10,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },
    
  ]


  ofertas=[
    
      {
        titulo:'viernes 1x2',
        info:'Todos los Lunes y/o Viernes, agenda tu servicio de las 8:00 a las 14:00 horas y pagas tan solo $22.00 x Kilo',
        visto: false,
      },
      
      {
        titulo:'jueves 1x2',
        info:'Todos los Lunes y/o Viernes, agenda tu servicio de las 8:00 a las 14:00 horas y pagas tan solo $22.00 x Kilo',
        visto: false,
      }

      
    ]
  


  efectos=new Efectos()

  constructor(
    private router:Router
  ) { }

  ngOnInit() {

    this.efectos.espavlecerTamaño(this.servicios.length,this.ofertas.length)
  }

 /* irASolicitud(){
    this.router.navigate(['/solicitud'])
  }*/

  seleccionar(servicio){
        if(servicio.elegido==false)
          servicio.elegido=true
        else
          servicio.elegido=false
  }

  
  irASolicitud(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.servicios)
      }
    };
    this.router.navigate(['solicitud'], navigationExtras);
  }

}
