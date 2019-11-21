import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Efectos } from './Efectos';
import { GlobalElementService } from '../../global-element.service';
import { Socket } from 'ngx-socket-io';
import { NotificaService } from '../../notificaciones/notifica.service';


@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.page.html',
  styleUrls: ['./info-pedido.page.scss'],
})
export class InfoPedidoPage implements OnInit {

  tipo_de_entrega
  costoReparto1
  costoReparto2
  costoLavanderia
  total

  yo_cambie_status=false

  pedido={
    id:null,
    nombre:'',
    hora:'',
    status: '',
    visto: false,
    icon:'',
    servicios_lavanderia:[],
    servicios_tititoreria:[],
    servicios_planchado:[],
    indicaciones:''
  }
  efectos=new Efectos()

  idPedido
  idLavanderia
  idRepartidor

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private apiservice:GlobalElementService,
    private socket:Socket,
    private notificacion:NotificaService
  ) { 

    this.route.queryParams.subscribe(params => {
      let pedido1 = JSON.parse(params.special);
      console.log("data= ",pedido1);
      this.idPedido=pedido1.id
      this.getInfoPedido()


      socket.on('se_actualiso_el_pedido'+'id_user'+localStorage.getItem('idUser'),(data)=>{
        console.log("entra soket 1111111111111");
        this.getInfoPedido()
    
      })
  });



  }

  ngOnInit() {
 
  }


  
  irAlavanderia(){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({id:this.idLavanderia})
      }
    };
    this.router.navigate(['lavanderia'], navigationExtras);
   
  }

  irAStatus(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({id:this.idRepartidor})
      }
    };
    this.router.navigate(['/seguimiento'],navigationExtras)
  }


  regresar(){
    
        if(this.yo_cambie_status==true){
          localStorage.setItem('actualiza','si')
        }else{
          localStorage.setItem('actualiza','no')
        }
        this.router.navigate(['/status'])
  }

  getInfoPedido(){
    this.apiservice.getPedidosPorId(this.idPedido).subscribe(Response=>{
      console.log("Response------------------------",Response);
      let hora:any=JSON.parse(Response.fecha_pedido)
      this.idLavanderia=Response.lavanderia_id

        this.idRepartidor=Response.repartidor_id
        this.tipo_de_entrega=Response.tipo_entrega
     

        let precios:any=JSON.parse(Response.precio)
        console.log("estos son los precios",precios);
        
        if(parseFloat(precios.precio_lavanderia)>0){
              if(Response.tipo_entrega=='completo'){
                  this.total=(parseFloat(precios.precio_entregar)*2)+parseFloat(precios.precio_lavanderia)
              }else{
                this.total=parseFloat(precios.precio_entregar)+parseFloat(precios.precio_lavanderia)
              }

            this.costoLavanderia=precios.precio_lavanderia
        }else{
          this.costoLavanderia=0
        }

        this.costoReparto1=precios.precio_entregar
       

        let servi_lavanderia:any=[]
        let servi_tito:any=[]
        let servi_plan:any=[]
        
        if(Response.datos_ropa!=null){
          let datos:any=JSON.parse(Response.datos_ropa)
            console.log("dotos---------------",datos);
            servi_lavanderia=datos.lavanderia
            servi_tito=datos.tintoreria
            servi_plan=datos.planchado
        }else{
          let servicioss:any=JSON.parse(Response.servicios)
          console.log("******************",servicioss);
          if(servicioss.lavanderia.length>0){
                servicioss.lavanderia.forEach(element => {
                  console.log("||||||||||||||||||",element);
                  let item1={
                    precio:element.precio,
                    servicio: element.servicio,
                    unidad: element.unidad,
                    catidad:0,
                    costo:0
                  }
                  servi_lavanderia.push(item1)
              });
          }

          if(servicioss.tintoreria.length>0){
              servicioss.tintoreria.forEach(element => {
                console.log("||||||||||||||||||",element);
                let item1={
                  precio:element.precio,
                  servicio: element.servicio,
                  unidad: element.unidad,
                  catidad:0,
                  costo:0
                }
                servi_tito.push(item1)
            });

        }


        if(servicioss.planchado.length>0){
              servicioss.planchado.forEach(element => {
                console.log("||||||||||||||||||",element);
                let item1={
                  precio:element.precio,
                  unidad: element.unidad,
                  catidad:0,
                  costo:0
                }
                servi_plan.push(item1)
            });

        }


        }


      this.apiservice.getLavanderia(Response.lavanderia_id).subscribe(Response2=>{
        
        let services:any=JSON.parse(Response.servicios)
      console.log("LLLLLLLLLLLLLLLLLLLLL",services);
        this.pedido={
          id:4,
          nombre:Response2.nombre_lavanderia,
          hora:this.tConvert(''+hora.hora+':'+hora.minutos)+'/ '+hora.dia+'/ '+hora.mes,
          status: Response.status,
          visto: false,
          icon:this.efectos.getStatusIcon(Response.status),
          servicios_lavanderia:servi_lavanderia,
          servicios_tititoreria:servi_tito,
          servicios_planchado:servi_plan,
          indicaciones:Response.indicaciones
         }

         

         console.log("55555555555555555555555555555 ",this.pedido);
      })
    
     
      
    })
  }



  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }


  optenerCostoTotal(){

  }


  comfirmarRecivido(){
    let item={
      status:'Finalizado'
    }
    
   console.log("pedddio",);
   
    this.apiservice.setStatusPedido(this.idPedido,item).subscribe(Response=>{
      this.yo_cambie_status=true
      this.notificacion.enviarMensaje('Se a finalizado una solucitud','El cliente a recivido su ropa','Repartidor'+this.idRepartidor)
      this.notificacion.enviarMensaje('Se a finalizado una solucitud','El cliente a recivido su ropa','Lavanderia'+this.idLavanderia)
      this.socket.emit('asignarReaptidor',this.idRepartidor)
      this.socket.emit('nuevo_status','id_lavanderia'+this.idLavanderia)
  
      this.getInfoPedido()
    
    })


  }

}
