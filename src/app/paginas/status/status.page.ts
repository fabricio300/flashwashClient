import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import { Socket } from 'ngx-socket-io';
import { error } from 'util';


@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  efectos=new Efectos()
  viewFilters=false
  servicios
  nombresDecliente=''
  sin_parapetros=false
  sin_resultados=false
  buscando=true
  pedidos=[]
  sin_coteccion=false
  filtros=[
    {
      filtro:'Recogiendo',
      stado:true
    },
    {
     filtro:'Entregando',
     stado:true
   },
   {
     filtro:'Cancelado',
     stado:true
   },
 
   {
     filtro:'Nuevo pedido',
     stado:true
   },
   {
     filtro:'A lavandería',
     stado:true
   },
   {
     filtro:'En proceso',
     stado:true
   }
   ,
   {
     filtro:'Finalizado',
     stado:true
   },
   {
     filtro:'Lista y limpia',
     stado:true
   }
     
   ]
 

  /*pedidos=[
    {
      id:1,
      nombre:'lavadora',
      hora:'11:00 pm',
      status: 'En proceso',
      ser_visto:true,
      icon:this.efectos.enLavanderia,
      servicios:[
        'servicio 1',
        'servicio 2',
       
      ]
    },

    {
      id:2,
      nombre:'Nombre ',
      hora:'11:00 pm',
      status: 'Entregando',
      ser_visto:true,
      icon:this.efectos.moto1,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    },

    {
      id:3,
      nombre:'chino 3',
      hora:'11:00 pm',
      status: 'Recogiendo',
      ser_visto:true,
      icon:this.efectos.moto0,
      servicios:[
        'servicio 1',
        'servicio 2',
       
      ]
    },
    {
      id:4,
      nombre:'freco 4',
      hora:'11:00 pm',
      status: 'A lavandería',
      ser_visto:true,
      icon:this.efectos.moto2,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    },
    {
      id:4,
      nombre:'peso mo',
      hora:'11:00 pm',
      status: 'Cancelado',
      ser_visto:true,
      icon:this.efectos.cancel,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    },
    {
      id:4,
      nombre:'opnitrix',
      hora:'11:00 pm',
      status: 'Lista y limpia',
      ser_visto:true,
      icon:this.efectos.esperando,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    },
    {
      id:4,
      nombre:'Nombre de lavanderia 4',
      hora:'11:00 pm',
      status: 'Finalizado',
      ser_visto:true,
      icon:this.efectos.finalsizadp,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    },
    {
      id:4,
      nombre:'burlo',
      hora:'11:00 pm',
      status: 'Nuevo pedido',
      ser_visto:true,
      icon:this.efectos.lava,
      servicios:[
        'servicio 1',
        'servicio 2',
        
      ]
    }


  ]*/

  constructor(
    private router:Router,
    private router1:ActivatedRoute,
    private apiService:GlobalElementService,
    private socket:Socket
  ) {

    this.router1.queryParams.subscribe(params => {
      if(params.special!=null){
        this.servicios = JSON.parse(params.special);
        console.log("data= ",this.servicios);
        this.sin_parapetros=false
      }else{
        this.sin_parapetros=true
      }
     
      socket.on('se_actualiso_el_pedido'+'id_user'+localStorage.getItem('idUser'),(data)=>{
        console.log("entra soket 1111111111111");
        this.pedidos=null
        this.getPedidos()
    
      })

     /* setInterval(()=>{
        if(localStorage.getItem('actualiza')!=null && localStorage.getItem('actualiza')=='si'){
          localStorage.setItem('actualiza','no')
          this.pedidos=null
          this.getPedidos()
        }
      },1000)*/
      
    
  });

  

 

   }

  ngOnInit() {
    this.ocultarFiltro()
    this.pedidos=null
    this.getPedidos()
  }



  verDetalles(pedido){
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(pedido)
      }
    };
    this.router.navigate(['/info-pedido'], navigationExtras);
  }


  regresar(){
    if(this.sin_parapetros==false)
      this.router.navigate(['/lavanderia'])
    else
      this.router.navigate(['/inicio'])
  }


  getPedidos(){
    this.buscando=true
    this.pedidos=[]
      this.apiService.getPedidosPorUsuario(localStorage.getItem('idUser')).subscribe(Response=>{
        console.log("pedios= ",Response);
          let cantidad=parseInt(Response.length)
        
        Response.forEach(element => {
            let hora:any=JSON.parse(element.fecha_pedido)
              this.apiService.getLavanderia(element.lavanderia_id).subscribe(Response2=>{
              
                console.log(hora);

                let item={
                  id:element.id,
                  nombre:Response2.nombre_lavanderia,
                  hora:this.tConvert(''+hora.hora+':'+hora.minutos)+'/ '+hora.dia+'/ '+hora.mes,
                  status: element.status,
                  icon:this.efectos.getStatusIcon(element.status),
                  ser_visto:true
                }


                this.pedidos.push(item)
                this.buscando=true
                this.terminar(this.pedidos,cantidad)
              })

                console.log("ppppppppppppp",this.pedidos);
                
        });
        //this.buscando=false
      },error=>{
        this.buscando=false
        this.sin_coteccion=true
      }

      )
  }

terminar(pedidos:any, cantidad){
    if(pedidos.length>=cantidad){
      this.buscando=false
      if(cantidad==0){
        this.sin_resultados=true
      }
    }
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




  
  verStadosDefiltros(){
    let sinVisualizar=0
    this.pedidos.forEach(element => {
          this.filtros.forEach(element1 => {
                  if(element1.filtro==element.status){
                      if(element1.stado==true){
                        element.ser_visto=true
                      }else{
                        element.ser_visto=false
                        sinVisualizar=sinVisualizar+1
                      }
                  }
          });
    });
    if(sinVisualizar==this.pedidos.length){
      console.log("sin ver");
      this.sin_resultados=true
    }else{
      this.sin_resultados=false
    }
    this.vewFiltros()
  }


  vewFiltros(){
    if(this.viewFilters==false){
      this.viewFilters=true
      this.mostrarFiltro()
    }else{
      this.viewFilters=false
      this.ocultarFiltro()
    }
  }



  ocultarFiltro(){
    document.getElementById('filtro11').style.transition='0.5s'
    document.getElementById('filtro11').style.marginTop='-200%'
  }

  mostrarFiltro(){
    document.getElementById('filtro11').style.transition='0.5s'
    document.getElementById('filtro11').style.marginTop='0'
  }

}


  