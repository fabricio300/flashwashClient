import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

export class efectos {
   
    filActivo=false;
    filtros=[
        {
          activo:false,
          opcion:'opcion1'
        },
        {
          activo:false,
          opcion:'opcion2'
        }
        
      ]

    constructor(
    ){
        
    }

   


    recetearFiltros(){
        this.filtros.forEach(element => {
            element.activo=false;
        });
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
    
    
     
}