
export class Efectos{

    //iconos
    direccion='../../../assets/iconos/placeholder.png'
    correo='../../../assets/iconos/at.png'
    iconCel='../../../assets/iconos/call-answer.png'
    iconUrl='../../../assets/iconos/url.png'
    iconArrowDown='../../../assets/iconos/arrow-down-sign-to-navigate.png'
    iconArrowUp='../../../assets/iconos/chevron.png'
    iconWash='../../../assets/iconos/washing-machine (1).png'

    //efectos de servcio
    anterior


    constructor(){

    }
    

    viewService(servicio){
        
        if(this.anterior!=null && this.anterior.servicio!=servicio.servicio){
            this.anterior.visto=false
            this.ocultar(this.anterior.servicio)  
       }
        

        if(servicio.visto==true){
            servicio.visto=false
            this.ocultar(servicio.servicio)
        }else{
            servicio.visto=true
            this.mostrar(servicio.servicio)
            
            document.getElementById(servicio.servicio+'point').scrollIntoView(true);
        }


        this.anterior=servicio
    }





    mostrar(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.marginTop='0px'
        document.getElementById(id).style.height='200px'
    }
 
    ocultar(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='0px'
      
        document.getElementById(id).style.marginTop='-20px'
    }

    

 

}