import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.page.html',
  styleUrls: ['./info-pedido.page.scss'],
})
export class InfoPedidoPage implements OnInit {
  pedido:any


  constructor(
    private route: ActivatedRoute,
  ) { 

    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params.special);
      console.log("data= ",this.pedido);
  
  });



  }

  ngOnInit() {
  }

}
