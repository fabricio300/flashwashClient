import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicioStatus'
})
export class InicioFiltroPipe implements PipeTransform {

 
  transform(value: any,args: any): any {
    const resultado=[]
    
//console.log("ebtrered",value);
  
    for(const post of value){
      //console.log("fillll ", post);
      
        var elemet=""+post.nombre
        var valor=""+args
        if(elemet.toLowerCase().indexOf(valor.toLowerCase())>-1){
            //console.log("echo");
            resultado.push(post)
        }
        
    }

    if(resultado.length==0){
      //console.log("vvvvvvvvvvvv",value);
      
      return value
    }else{
      return resultado
    }
    
  }

}
