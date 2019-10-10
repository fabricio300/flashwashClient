import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import {efectos} from './efectos'

import { Socket } from 'ngx-socket-io';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  efectos1=new efectos()
  paginas=[
   
    {
      titulo:'Estado de pedido',
      url:'/status',
      icon: '../../../assets/iconos/bike.png'
    },
    {
      titulo:'Guardados',
      url:'/guardados',
      icon: '../../../assets/iconos/bookmark-black-shape (1).png'
    }
  ]
  


  filtros=[
    {
      activo:false,
      opcion:'opcion1'
    },
    {
      activo:false,
      opcion:'opcion2'
    },
    {
      activo:false,
      opcion:'opcion2'
    }
    
  ]

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
    private menu:MenuController,
    private router:Router,
    private global:GlobalElementService,
    private socket: Socket
    ) { 

      socket.on('mensajeServidor',function(data){
        console.log('data=',data);
        
      })
    }


  
  ngOnInit() {
    if(localStorage.getItem('secion')=='true'){
      this.global.status_de_secion=true
    }else{
      this.global.status_de_secion=false
    }
    console.log("secion",this.global.status_de_secion);

    document.getElementById('filtros').style.transition="0.5s"
    this.efectos1.ocultarFiltros()

  }


 openFirst() {
    
          this.menu.enable(true, 'first');
          this.menu.open('first');
    
    
      }
    
      closeFirst(){
        
        this.menu.enable(false, 'first');
        this.menu.close('first');
      }
 

 
  

  cerraSecion(){
    localStorage.setItem('secion','false')
    this.global.status_de_secion=false
  }


  irALavanderia(){
    this.router.navigate(['/lavanderia'])
  }



  emitirMensaje(){
    let mensaje={
      id:1,
      texto:'hola',
      hora:'10:30 pm',
      status:'A lavandería'
    }
    this.socket.emit('message',mensaje)

    console.log("enviado");
    
  }

 

  

  



















}
