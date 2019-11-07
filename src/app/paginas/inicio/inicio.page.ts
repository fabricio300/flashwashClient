import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import {efectos} from './efectos'

//import { Socket } from 'ngx-socket-io';
import { MenuController } from '@ionic/angular';



import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

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

  lavandrias=[]
    /*{
      id:1,
      nombre:'lavandería 1',
      imagene:'../../../assets/iconos/shutterstock_422824102.jpg',
      servicios:[
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

    },
    {
      id:2,
      nombre:'lavandería 1',
      imagene:'../../../assets/iconos/shutterstock_422824102.jpg',
      servicios:[
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

    }
  ]*/

  constructor(
    private menu:MenuController,
    private router:Router,
    private global:GlobalElementService,
   // private socket: Socket,
    private notificacion:LocalNotifications,
    private backgroundMode: BackgroundMode,
    ) { 

     

     /* socket.on('mensajeServidor',function(data){
        console.log('data=',data);
        
      })*/



    
     
     
        
     
     





    }


  
  ngOnInit() {
    if(localStorage.getItem('secion')=='true'){
      this.global.status_de_secion=true
     //this.entraAsegudoPlano() //avilitar en segundo plano
    }else{
      this.global.status_de_secion=false
      this.backgroundMode.disable();//inavilitar en segundo plano
    }
    console.log("secion",this.global.status_de_secion);

    document.getElementById('filtros').style.transition="0.5s"
    this.efectos1.ocultarFiltros()

      this.mensaje()
    this.getLavanderias1()
  }


 openFirst() {
    
          this.menu.enable(true, 'first');
          this.menu.open('first');
          this.efectos1.ocultarFiltros()
    
      }
    
      closeFirst(){
        
        this.menu.enable(false, 'first');
        this.menu.close('first');
        
      }
 

 
  

  cerraSecion(){
    localStorage.setItem('secion','false')
    this.global.status_de_secion=false
  }


  irALavanderia(id){
   
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({id:id})
      }
    };
    this.router.navigate(['lavanderia'], navigationExtras);
  }



  emitirMensaje(){
    let mensaje={
      id:1,
      texto:'hola',
      hora:'10:30 pm',
      status:'A lavandería'
    }
    //this.socket.emit('message',mensaje)

    console.log("enviado");
    
  }

 

  

  



/**--------------------notificaciones ------------------------------------------------------------------------------------------- */

  mensaje(){
    console.log('mensaje');
    
    this.notificacion.schedule({
        id: 1,
        smallIcon: 'res://information',
        text: 'mensaje',
        icon: 'file://assets/iconos/flaswash.png', 
      });
}





/*----------------------------segudo plano----------------------------------------------------------------------- */


/*---------------------------api----------------------------------------------------------------------- */

getLavanderias1(){
  this.lavandrias=null
  this.lavandrias=[]
  this.global.getLavanderias().subscribe(Response=>{
    console.log(Response);
    
    Response.forEach(element => {
      console.log(element.id);
      this.global.getServiciosLavanderia(element.id).subscribe(echo=>{
        console.log(echo);
        this.modificar(echo,element)
        console.log("LAVANDERIAS:",this.lavandrias)
      })
    });
   
    
   
  })
}


modificar(arreglo:any, element:any){
  console.log("estre,",arreglo);
  console.log(element);

  let servicios1=[]
  




console.log("servicio",arreglo[0].servicio);


  let item={id:element.id,
    nombre:element.nombre_lavanderia,
    imagene:'../../../assets/iconos/shutterstock_422824102.jpg',
    servicios:JSON.parse(arreglo[0].servicio)
  }


  console.log(item);
  
  this.lavandrias.push(item)
  
}


}
