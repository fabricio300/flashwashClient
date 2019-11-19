import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

export class efectos {
   
    filActivo=false;
      
    flitros:any

    constructor(
    ){
        
    }

   


   
    
     
      

      ocultarFiltros(){ 
        
        document.getElementById('filtros').style.height="0px" 
        //this.recetearFiltros()
        this.filActivo=false
      }
    
      verfiltros(){
        document.getElementById('filtros').style.height="100%"
        this.filActivo=true
      }
    
      setFiltros(filtros){
        this.flitros=filtros
      }
    

      aplicarFiltros(arreglo:any){
        

      if(this.todoFalse()==false && this,this.todoTrue()==false){
        arreglo.forEach(element => {
              let cumple_con_uno=false
                this.flitros.forEach(element2 => {
                  
                  switch(element2.opcion){
                      case 'Planchado':  if(element2.activo==true && element.planchado==true){ cumple_con_uno=true}
                      break;
                      case 'Tintoreria':if(element2.activo==true && element.tintoreria==true){ cumple_con_uno=true}
                      break;
                      case 'Ofertas':if(element2.activo==true && element.ofertar==true){ cumple_con_uno=true}
                      break;
                      case 'Otros servicios':if(element2.activo==true && element.otros==true){ cumple_con_uno=true}
                      break;
                  }
                  
                });

                if(cumple_con_uno){
                    element.visto=true
                }else{
                  element.visto=false
                }

        });
      }

      if(this.todoTrue()==true || this.todoFalse()==true){
        arreglo.forEach(element => {
          element.visto=true
        });
      }
        this.ocultarFiltros()
      }
      
     todoFalse(){
       let res=0

       this.flitros.forEach(element => {
            if(element.activo==false){
              res=res+1
            }
       });

       if(res==this.flitros.length){
         return true
       }else{
         return false
       }


     }

     todoTrue(){
      let res=0
      this.flitros.forEach(element => {
           if(element.activo==true){
             res=res+1
           }
      });

      if(res==this.flitros.length){
        return true
      }else{
        return false
      }
       

     }
}




