
export class Efectos{
    //iconos
    iconCancelar='../../../assets/iconos/error.png'
    iconMas='../../../assets/iconos/add-button-inside-black-circle.png'
    iconMenos='../../../assets/iconos/minus-sign-inside-a-black-circle.png'
    iconLavadors='../../../assets/pedir/washing-machine2.png'
    iconRopa='../../../assets/iconos/casual-t-shirt.png'
    iconMoney='../../../assets/iconos/coin.png'
    iconinstrucciones='../../../assets/pedir/strategy.png'
    iconMoto='../../../assets/pedir/bike.png'
    iconNota='../../../assets/pedir/invoice.png'
    duda='../../../assets/imagenes/information.png'

    costo_entrega=0.0
    costo_recoger=0.0
    precioComun=0.0
  
    actual=0

    listaServicios=false     

    tipoDeEntrega
    entregar
    reparto


    indicaciones=''

    cantidadPedidaDeLavanderia=0
    cantidadPedidaDeTintoreria=0
    cantidadPedidadDePlanchado=0

    tipoEntrega(tipo){
       this.tipoDeEntrega= tipo
    }
    constructor(){

    }



    next(){
        this.actual=this.actual+1

        console.log("tipo ",this.tipoDeEntrega);
        console.log("tipodd ",this.indicaciones);
        
        switch(this.actual){
            case 3: this.optenerTipoDetransporte()
            break;
        }
        
      }
    
      regresar(){
        this.actual=this.actual-1
      }
    

      mostrarLista(){
          console.log("bhh");
          if(this.listaServicios==false)
          this.listaServicios=true
          else
          this.listaServicios=false
      }


      addServicio(servicio,tipo,arreglo){
            servicio.elegido=true;
            this.optenerCantidadPedida(tipo,arreglo)
            
      }

     


      removerServicio(servicio,tipo,arreglo){
          servicio.elegido=false
          this.optenerCantidadPedida(tipo,arreglo)
      }



    optenerCantidadPedida(tipo,arreglo:any){
        let elegidos=0
        arreglo.forEach(element => {
            if(element.elegido==true){
                elegidos=elegidos+1
            }
        });

        switch(tipo){
            case 0: this.cantidadPedidaDeLavanderia=elegidos
                break;
            case 1:this.cantidadPedidaDeTintoreria=elegidos
                break;
            case 2:this.cantidadPedidadDePlanchado=elegidos
                break;
        }
    }

      mostrarReparto(id){
        if(this.reparto==id){
            this.reparto=''
        }else
            this.reparto=id

            
      }


     






      optenerTipoDetransporte(){
          if(this.tipoDeEntrega=='tipo1'){
            this.tipoDeEntrega='tipo1'
            this.entregar='solo_recojer'
            this.costo_recoger=this.precioComun
          }
          if(this.tipoDeEntrega=='tipo2'){
            this.tipoDeEntrega='tipo2'
            this.entregar='solo_entregar'
            this.costo_entrega=this.precioComun
          
            }

            if(this.tipoDeEntrega=='tipo3'){
                this.tipoDeEntrega='tipo3'
                this.entregar='completo'
                this.costo_entrega=this.precioComun
                this.costo_recoger=this.precioComun
            }
      }
}