import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import { Socket } from 'ngx-socket-io';



@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  

  nombre_repartidor
  matricula_repartidor
  id_repartidor
  foto_repartidor
  lat: number = 51.678418;
  lng: number = 7.809007;
  buscado=true
  sin_resultados=false

  constructor(
    public platform: Platform,
    private route:ActivatedRoute,
    private apiservice:GlobalElementService,
    private socket:Socket
    ) {
    this.route.queryParams.subscribe(params => {
      let repar = JSON.parse(params.special);
      console.log("data= ",repar);
      this.id_repartidor=repar.id
      console.log("loca store", localStorage.getItem('idUser'));
      

    })

    
    socket.on('user_coordenadas_pedido'+localStorage.getItem('idUser'),(data)=>{
      console.log("eeeeemin");
      
        this.apiservice.getCoordenadasRepartidor(this.id_repartidor).subscribe(Response=>{
          //console.log("coooooooooooooooooooooooooooo");
          console.log(Response);
          let cor:any=JSON.parse(Response[0].coordenadas)
        //console.log("corrr",cor);
        
        this.lat=parseFloat(cor.lat)

        this.lng=parseFloat(cor.lon)
          console.log("latitud=",this.lat);
          console.log("latitud=",this.lng);
          
        })
    })
  }


  ngOnInit(): void {
    this.getReapartidor()
  }


  getReapartidor(){
      this.apiservice.getRepartidor(this.id_repartidor).subscribe(Response=>{
        console.log(Response);
        this.nombre_repartidor=''+Response.nombres+' '+Response.apellidos
        this.matricula_repartidor=''+Response.matricula

        let foto:any=JSON.parse(Response.foto_perfil)
        //console.log(foto);
        this.foto_repartidor=foto[0].imagen
       // console.log(this.foto_repartidor);

        let cor:any=JSON.parse(Response.coordenadas)
        console.log("corrr",cor);
        
        this.lat=parseFloat(cor.lat)

        this.lng=parseFloat(cor.lon)
      })
  }




}
