export class Efectos{
    iconArrowDown='../../../assets/iconos/arrow-down-sign-to-navigate.png'
    iconArrowUp='../../../assets/iconos/up-arrow.png'
    enLavanderia='../../../assets/iconos/washing-machine2.png'
   
    
    cancel='../../../assets/iconos/cross.png'
    lava='../../../assets/iconos/washing-machine2.png'
    moto0='../../../assets/iconos/vespa4.png'
    moto1='../../../assets/iconos/vespa3.png'
    moto2='../../../assets/iconos/vespa2.png'
    nuevo='../../../assets/iconos/new-product.png'
    finalsizadp='../../../assets/iconos/check-mark.png'
    esperando='../../../assets/iconos/help.png'

    constructor(){

    }


    verInfo( pedido){

        if(pedido.visto==false){
            pedido.visto=true
            this.mostrar(pedido.id)
        }else{
            pedido.visto=false
            this.ocultar(pedido.id)
        }

    }

    mostrar(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='400px'
    }


    ocultar(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='0px'
    }



    getStatusIcon(status){

        switch (status) {
          case 'En proceso': return this.lava
            
          break;
    
          case 'A lavandería': return this.moto2
            
            break;
    
            case 'Cancelado': return this.cancel
            
              break;
    
              case 'Entregando': return this.moto1
            
                break;
                case 'Recogiendo': return this.moto0
            
                  break;
                  case 'Nuevo pedido': return this.nuevo
            
                    break;
                    case 'Lista y limpia': return this.esperando
        
                    break;
                    case 'Finalizado': return this.finalsizadp
              
                      break;
        
          default:
            break;
        }
    
      }

}