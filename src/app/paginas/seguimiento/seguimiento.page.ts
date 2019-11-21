import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';


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

  constructor(
    public platform: Platform,
    private route:ActivatedRoute,
    private apiservice:GlobalElementService
    ) {
    this.route.queryParams.subscribe(params => {
      let repar = JSON.parse(params.special);
      console.log("data= ",repar);
      this.id_repartidor=repar.id
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
        console.log(foto);
        this.foto_repartidor=foto[0].imagen
        console.log(this.foto_repartidor);
        
      })
  }



}
