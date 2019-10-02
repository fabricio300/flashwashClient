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
      servicio:'Ropa de color',
      precio: 30,
      visto: false,
      elegido:false
    },
    {
      servicio:'Planchado',
      precio: 40,
      visto: false,
      elegido:false
    },
    {
      servicio:'Ropa de ceda',
      precio: 100,
      visto: false,
      elegido:false
    },

    {
      servicio:'Ropa de cama',
      precio: 100,
      visto: false,
      elegido:false
    },
    
  ]


  efectos=new Efectos()

  constructor(
    private router:Router
  ) { }

  ngOnInit() {

   
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
