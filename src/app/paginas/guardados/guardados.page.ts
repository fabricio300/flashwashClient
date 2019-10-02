import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {
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
      opcion:'opcion3'
    }
    
  ]


  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }


  irALavanderia(){
    this.router.navigate(['/lavanderia'])
  }

}
