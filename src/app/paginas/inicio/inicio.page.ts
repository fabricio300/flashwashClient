import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import {efectos} from './efectos'

import { Socket } from 'ngx-socket-io';
import { MenuController } from '@ionic/angular';



import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { ToastController } from '@ionic/angular';
import { NotificaService } from '../../notificaciones/notifica.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  buscando=true
  sin_resultados=false

  efectos1=new efectos()
  busqueda=''
  paginas=[
    {
      titulo:'Editar información',
      url:'/edit-info',
      icon: '../../../assets/iconos/edit.png'
    },
    {
      titulo:'Estado de pedido',
      url:'/status',
      icon: '../../../assets/iconos/bike.png'
    },
    /*{
      titulo:'Historial',
      url:'/guardados',
      icon: '../../../assets/iconos/clock.png'
    }*/
  ]
  


  filtros=[
    {
      activo:true,
      opcion:'Planchado'
    },
    {
      activo:true,
      opcion:'Tintoreria'
    },
    {
      activo:true,
      opcion:'Ofertas'
    },
    {
      activo:true,
      opcion:'Otros servicios'
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
    private socket: Socket,
    private notificacion:LocalNotifications,
    private backgroundMode: BackgroundMode,
    public toastController: ToastController,
    public notificacionG: NotificaService
    ) { 

     

    

      socket.on('nueva_lavanderia',(data)=>{
        console.log("ENTRO AL SOCKET",data);
        
        this.getLavanderias1()
        this.presentToast()
      });
    
     
     console.log("id usuario=",localStorage.getItem('idUser'));
     
      
    }


  
  ngOnInit() {
    if(localStorage.getItem('secion')=='true'){
      this.global.status_de_secion=true
      this.notificacionG.suscrivirceAtema()
     //this.entraAsegudoPlano() //avilitar en segundo plano
    }else{
      this.global.status_de_secion=false
      this.backgroundMode.disable();//inavilitar en segundo plano
    }
    console.log("secion",this.global.status_de_secion);

    document.getElementById('filtros').style.transition="0.5s"
    this.efectos1.ocultarFiltros()

      //this.mensaje()
    this.getLavanderias1()
    this.efectos1.setFiltros(this.filtros)
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
    this.notificacionG.desSuscribirce()
    localStorage.setItem('secion','false')
    this.global.status_de_secion=false
    localStorage.clear()
    this.closeFirst()
  }


  irALavanderia(id){
   
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({id:id})
      }
    };
    this.router.navigate(['lavanderia'], navigationExtras);
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Una nueva lavandería acaba de unirce.',
      duration: 4000
    });
    toast.present();
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
  this.sin_resultados=false
  this.buscando=true
  this.global.getLavanderias().subscribe(Response=>{
    console.log("fotos:\n",Response);
    
    Response.forEach(element => {
     
      

     

      this.global.getServiciosLavanderia(element.id).subscribe(echo=>{
      //  console.log(echo);
        this.modificar(echo,element,JSON.parse(element.fotografias))
        console.log("LAVANDERIAS:",this.lavandrias)
      })



    });
   
    
   
  },erro=>{
    this.buscando=false
    this.sin_resultados=true
  })
}


modificar(arreglo:any, element:any,imajenes:any){
  console.log("estre,",arreglo);
  console.log(element);

  let iterador=0
  let plachado=false
  let otrosServicios=false
  let tintoreria=false
  let ofertar=false

console.log("servicio",arreglo[0].servicio);

this.global.getServiciosOtros(element.id).subscribe(ResponseO=>{
  console.log("--------------------------------------------",element.id);
  console.log("tiene otros servicios", ResponseO);
  
  if(ResponseO.length>0){
    otrosServicios=true
  }
  iterador=iterador+1
  this.addITEMM(element,imajenes,arreglo,tintoreria,plachado,ofertar,otrosServicios,iterador)

})

this.global.getServiciosOfertar(element.id).subscribe(ResponseO=>{
  console.log("--------------------------------------------",element.id);
  console.log("tiene ofertas", ResponseO);

  if(ResponseO.length>0){
    ofertar=true
  }
  iterador=iterador+1
  this.addITEMM(element,imajenes,arreglo,tintoreria,plachado,ofertar,otrosServicios,iterador)
})

this.global.getServiciosTintoreria(element.id).subscribe(ResponseO=>{
  console.log("--------------------------------------------",element.id);
  console.log("tiene Tintoreria", ResponseO);
  if(ResponseO.length>0){
    tintoreria=true
  }
  iterador=iterador+1
  this.addITEMM(element,imajenes,arreglo,tintoreria,plachado,ofertar,otrosServicios,iterador)
})

this.global.getServiciosPlanchados(element.id).subscribe(ResponseO=>{
  console.log("--------------------------------------------",element.id);
  console.log("tiene Planchados", ResponseO);
  if(ResponseO.length>0){
    plachado=true
  }
  iterador=iterador+1
  this.addITEMM(element,imajenes,arreglo,tintoreria,plachado,ofertar,otrosServicios,iterador)
})
  
}



addITEMM(element,imajenes,arreglo,tintoreri,planchado,ofertar,otros, iterador){

if(iterador==4){
  let item={
    id:element.id,
    nombre:element.nombre_lavanderia,
    imagene:imajenes[0].imagen,
    servicios:JSON.parse(arreglo[0].servicio),
    tintoreria:tintoreri,
    planchado:planchado,
    ofertar:ofertar,
    otros:otros,
    visto:true
  }


  console.log(item);
  
  this.lavandrias.push(item)
  this.buscando=false
}
}

}
