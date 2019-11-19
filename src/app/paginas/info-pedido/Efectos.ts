export class Efectos{
   
    
   
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