import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  efectos=new Efectos();
    
  servicios

  

  constructor(
    private route: ActivatedRoute, 
    private router: Router,

    ) {
    this.route.queryParams.subscribe(params => {
        this.servicios = JSON.parse(params.special);
        console.log("data= ",this.servicios);
        this.efectos.medir(this.servicios)
    });

    
    
  }

  ngOnInit() {
    this.efectos.verSiPidioTodo(this.servicios)
  }


  irAStatus(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.servicios)
      }
    };
    this.router.navigate(['status'], navigationExtras);
  }  



}
