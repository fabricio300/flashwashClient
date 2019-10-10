
export class Efectos{
    //iconos
    iconCancelar='../../../assets/iconos/error.png'
    iconMas='../../../assets/iconos/add-button-inside-black-circle.png'
    iconMenos='../../../assets/iconos/minus-sign-inside-a-black-circle.png'
    iconLavadors='../../../assets/iconos/washing-machine.png'
    iconRopa='../../../assets/iconos/casual-t-shirt.png'
    iconMoney='../../../assets/iconos/coin.png'
    iconinstrucciones='../../../assets/iconos/strategy.png'
    iconMoto='../../../assets/iconos/bike.png'
    iconNota='../../../assets/iconos/invoice.png'
    duda='../../../assets/imagenes/information.png'


    actual=0

    listaServicios=false

    cantidadServicios
    pedidos=0
    todo=false
     

    tipoDeEntrega
    reparto


    indicaciones=''

    tipoEntrega(tipo){
       this.tipoDeEntrega= tipo
    }
    constructor(){

    }

    medir(servicios:any){
 
        this.cantidadServicios=servicios.length
        servicios.forEach(element => {
            if(element.elegido==true){
                this.pedidos=this.pedidos+1
            }
        });
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


      addServicio(servicio){
            servicio.elegido=true;
            this.pedidos=this.pedidos+1
            
            if(this.pedidos==this.cantidadServicios){
                this.todo=true
            }
      }


      removerServicio(servicio){
          servicio.elegido=false
          this.pedidos=this.pedidos-1
          this.todo=false
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
          }
          if(this.tipoDeEntrega=='tipo2'){
            this.tipoDeEntrega='tipo2'
            }

            if(this.tipoDeEntrega=='tipo3'){
                this.tipoDeEntrega='tipo3'
            }
      }
}