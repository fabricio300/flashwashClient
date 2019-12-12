import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import { Socket } from 'ngx-socket-io';
import { NotificaService } from '../../notificaciones/notifica.service';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  efectos=new Efectos();
    
  servicios:any
  tintoreria:any
  planchados:any
  idLavanderia:any
  precio:any
  actualservicio=0


  coordenadasCliente:any
  coordenadasLavanderia:any
  direccion_lavanderia
  direcion_cliente

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private global:GlobalElementService,
    private soket:Socket,
    private notificaciones:NotificaService
    ) {
    this.route.queryParams.subscribe(params => {
      console.log(params.special);
      
      let todo = JSON.parse(params.special);
      console.log("dataL= ",todo.lavanderia);
      this.servicios=todo.lavanderia
    
      this.tintoreria=todo.tintoreria
      this.planchados=todo.planchado
      this.idLavanderia=todo.idLavanderia

      this.global.getLavanderia(this.idLavanderia).subscribe(Response=>{
        console.log("lllllll",Response);
        this.coordenadasLavanderia=JSON.parse(Response.coordenadas)
        let direccion:any=JSON.parse(Response.direccion)
        this.direccion_lavanderia=direccion.address
        console.log("coordenadas lavanderia", this.coordenadasLavanderia);
        
      })

      this.global.getInfoUsuario(localStorage.getItem('idUser')).subscribe(Response=>{
        console.log("lllllll2",Response);
       let cor:any =JSON.parse(Response.direccion)
        this.coordenadasCliente=cor.coordenadas
        this.direcion_cliente=cor.address
        console.log("coordenadas coordenadasCliente",this.direcion_cliente);
      })

    });

    
    
  }

  ngOnInit() {
    this.efectos.optenerCantidadPedida(0,this.servicios)
    this.efectos.optenerCantidadPedida(1,this.tintoreria)
    this.efectos.optenerCantidadPedida(2,this.planchados)
    this.precio = this.calularPrecio()
    this.efectos.precioComun=this.precio
    
  }


  irAStatus(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.servicios)
      }
    };
    this.router.navigate(['status'], navigationExtras);
  }  

  cambiarServicio(num){
    this.actualservicio=num
  }

async hacerSolicitud(){

  this.mostrarCarga()

  let lavanderia1=[]
  let titore=[]
  let plancha=[]

  var f=new Date();
  

  if(this.efectos.cantidadPedidaDeLavanderia>0){
      let item:any
      this.servicios.forEach(element => {
        if(element.elegido==true){
          item={
            servicio:element.servicio,
            precio:element.precio,
            unidad:element.unidad
          }

          lavanderia1.push(item)
        }
      });
  }

  if(this.efectos.cantidadPedidaDeTintoreria>0){
    let item:any
    this.tintoreria.forEach(element => {
      if(element.elegido==true){
        item={
          servicio:element.servicio,
          precio:element.precio,
          unidad:element.unidad
        }

        titore.push(item)
      }
    });
}

if(this.efectos.cantidadPedidadDePlanchado>0){
  let item:any
  this.planchados.forEach(element => {
    if(element.elegido==true){
      item={
        precio:element.precio,
        unidad:element.unidad
      }

      plancha.push(item)
    }
  });
}
  

  let pre={  
    precio_regocojer:this.precio,
    precio_entregar:this.precio,
    precio_lavanderia:"0"
}

  let solicitud={
    usuario_id:localStorage.getItem('idUser'),
    lavanderia_id:this.idLavanderia,
    repartidor_id:null,
    fecha_pedido:JSON.stringify( {
      hora:f.getHours(),
      minutos:f.getMinutes(),
      dia:f.getDate(),
      mes:f.getMonth()+1,
      anio:f.getFullYear()
    }),
    status:'Nuevo pedido',
    datos_ropa:'',
    servicios:JSON.stringify({
      lavanderia:lavanderia1,
      tintoreria:titore,
      planchado:plancha,
      transporte:this.efectos.entregar
    }),
    precio:JSON.stringify(pre),
    coordenadas_lavanderia:JSON.stringify({lat:this.coordenadasLavanderia.lat, lon:this.coordenadasLavanderia.lon}),
    coordenadas_usuario:JSON.stringify({lat:this.coordenadasCliente.lat, lon:this.coordenadasCliente.lon}),
    coordenadas_repartidor:'',
    direccion_usuario:this.direcion_cliente,
    direccion_lavanderia:this.direccion_lavanderia,
    indicaciones:this.efectos.indicaciones,
    tipo_entrega:this.efectos.entregar


  }


  console.log("este item",solicitud);
  
  this.global.solisitarservicio(solicitud).subscribe(Response=>{
    console.log("pedido");
    this.notificaciones.enviarMensaje('Nueva solicitud', 'Tienes un nueva solicitud de servicios','Lavanderia'+solicitud.lavanderia_id)
    this.noMostrarCarga()
    this.irAStatus()
  })

  this.soket.emit('pedido',solicitud.lavanderia_id)

}

calularPrecio(){
  this.global.getLavanderia(this.idLavanderia).subscribe(Response=>{
    this.coordenadasLavanderia=JSON.parse(Response.coordenadas)
    let direccion:any=JSON.parse(Response.direccion)
    this.direccion_lavanderia=direccion.address
   
    this.global.getInfoUsuario(localStorage.getItem('idUser')).subscribe(Response=>{
      let cor:any =JSON.parse(Response.direccion)
       this.coordenadasCliente=cor.coordenadas
       this.direcion_cliente=cor.address
       console.log("COSA1", this.coordenadasLavanderia);
       console.log("COSA2",this.coordenadasCliente);
       let distancia = this.calculateDistance(this.coordenadasLavanderia.lon,this.coordenadasLavanderia.lon,this.coordenadasLavanderia.lat,this.coordenadasCliente.lat)
      console.log("LAS DISTANCIA ES DE:", distancia);
      let precio = 30.0 + (distancia*1.5) + (distancia/2)
      console.log("El precio es de:", precio.toPrecision(2));
      this.precio = precio.toPrecision(2);
     })
  })



}

calculateDistance(lon1, lon2, lat1, lat2){
  let p = 0.017453292519943295;
  let c = Math.cos;
  let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
  let dis = (12742 * Math.asin(Math.sqrt(a)));
  return dis;
}


mostrarCarga(){
  document.getElementById('Carga').style.transition="0.5s"
  document.getElementById('Carga').style.marginLeft="0px"
}

noMostrarCarga(){
  document.getElementById('Carga').style.transition="0.5s"
  document.getElementById('Carga').style.marginLeft="200%"
}


}
