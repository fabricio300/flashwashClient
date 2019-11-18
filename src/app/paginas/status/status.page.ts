import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  efectos=new Efectos()

  servicios

  sin_parapetros=false
  
  pedidos=[]
  /*pedidos=[
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


  ]*/

  constructor(
    private router:Router,
    private router1:ActivatedRoute,
    private apiService:GlobalElementService
  ) {

    this.router1.queryParams.subscribe(params => {
      if(params.special!=null){
        this.servicios = JSON.parse(params.special);
        console.log("data= ",this.servicios);
        this.sin_parapetros=false
      }else{
        this.sin_parapetros=true
      }
     
    
  });


   }

  ngOnInit() {
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
      this.apiService.getPedidosPorUsuario(localStorage.getItem('idUser')).subscribe(Response=>{
        console.log("pedios= ",Response);

        
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
                }


                this.pedidos.push(item)
              })

                console.log("ppppppppppppp",this.pedidos);
                
        });
        
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



}


  