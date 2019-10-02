import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  paginas=[
   
    {
      titulo:'Estado de pedido',
      url:'/status',
      icon: '../../../assets/iconos/bike.png'
    },
    {
      titulo:'Guardados',
      url:'/guardados',
      icon: '../../../assets/iconos/bookmark-black-shape (1).png'
    }
  ]
  


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
    },
    {
      activo:false,
      opcion:'opcion4'
    }
    ,
    {
      activo:false,
      opcion:'opcion5'
    },
    
    {
      activo:false,
      opcion:'opcion6'
    }
    
  ]

  
  filActivo=false;

  constructor(
    private menu: MenuController,
    private router:Router,
    private global:GlobalElementService
    ) { 

      
    }

  
  ngOnInit() {
    if(localStorage.getItem('secion')=='true'){
      this.global.status_de_secion=true
    }else{
      this.global.status_de_secion=false
    }
    console.log("secion",this.global.status_de_secion);


    document.getElementById('filtros').style.transition="0.5s"
    this.ocultarFiltros()
  }



 

  ocultarFiltros(){ 
    document.getElementById('filtros').style.marginTop="-100%" 
    //this.recetearFiltros()
    this.filActivo=false
  }

  verfiltros(){
    document.getElementById('filtros').style.marginTop="0"
    this.filActivo=true
  }

  activaFiltro(filtro:any){
    if(filtro.activo==false)
      filtro.activo=true
    else
      filtro.activo=false

    //console.log(this.filtros);  
  }

  recetearFiltros(){
    this.filtros.forEach(element => {
        element.activo=false;
    });
  }



  openFirst() {

      this.menu.enable(true, 'first');
      this.menu.open('first');


  }

  closeFirst(){
    
    this.menu.enable(false, 'first');
    this.menu.close('first');
  }


  irALavanderia(){
    this.router.navigate(['/lavanderia'])
  }

  cerraSecion(){
    localStorage.setItem('secion','false')
    this.global.status_de_secion=false
  }
}
