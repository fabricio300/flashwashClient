
export class Efectos{
    //iconos
    iconCancelar='../../../assets/iconos/error.png'
    iconMas='../../../assets/iconos/add-button-inside-black-circle.png'
    iconMenos='../../../assets/iconos/minus-sign-inside-a-black-circle.png'
    iconLavadors='../../../assets/iconos/washing-machine.png'
    iconRopa='../../../assets/iconos/casual-t-shirt.png'
    iconMoney='../../../assets/iconos/coin.png'
    iconinstrucciones='../../../assets/iconos/strategy.png'




    numeroDeserviciosNoSolicitados=0
    almenos1ServicioElegido=false
    serviciosVicible=false;
    servicios
    constructor(){

    }


    setServiciosNoSolicitados(services){
        this.servicios=services

        services.forEach(element => {
            if(element.elegido==false)
                this.numeroDeserviciosNoSolicitados++
            
        });
        
        console.log("dcsdvff",this.numeroDeserviciosNoSolicitados);
        this.existeElegido()
    }


    viewServices(){
        if(this.serviciosVicible==true){
            this.serviciosVicible=false
            this.ocultarServicios()
        }else{
            this.serviciosVicible=true
            this.mostrarServicios()
        }
    }


    mostrarServicios(){
        document.getElementById('ServicesX').style.transition='0.5s'

        if(this.numeroDeserviciosNoSolicitados==0)
            document.getElementById('ServicesX').style.height='54px'
        else
            document.getElementById('ServicesX').style.height=''+(this.numeroDeserviciosNoSolicitados*54)+'px'
       
    }

    ocultarServicios(){
        document.getElementById('ServicesX').style.transition='0.5s'
        document.getElementById('ServicesX').style.height='0px'
    }



    addService(service){
            service.elegido=true
            this.numeroDeserviciosNoSolicitados--
            this.mostrarServicios()
            this.existeElegido()
    }


    removeService(service){
        service.elegido=false
        this.numeroDeserviciosNoSolicitados++
        if(this.serviciosVicible==true)
                this.mostrarServicios()
        this.existeElegido()
    }


    existeElegido(){
        let va=false
            this.servicios.forEach(element => {
                if(element.elegido==true){
                    va=true
                    
                }
                        
            });
        this.almenos1ServicioElegido=va           
    }




    siguiente(){
        
        document.getElementById('primero').style.transition='0.5s'
        document.getElementById('primero').style.marginLeft='-100%'
        document.getElementById('pri').scrollIntoView(true)
        this.serviciosVicible=false
        this.ocultarServicios()
    }

    regresar(){
        document.getElementById('primero').style.transition='0.5s'
        document.getElementById('primero').style.marginLeft='0'
        document.getElementById('sec').scrollIntoView(true)
    }
}