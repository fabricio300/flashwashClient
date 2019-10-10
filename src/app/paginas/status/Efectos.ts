export class Efectos{
    iconArrowDown='../../../assets/iconos/arrow-down-sign-to-navigate.png'
    iconArrowUp='../../../assets/iconos/up-arrow.png'
    enLavanderia='../../../assets/iconos/washing-machine2.png'
   
    mapa='../../../assets/iconos/map.png'
    tienda='../../../assets/iconos/store.png'

    moto0='../../../assets/iconos/vespa4.png'
    moto1='../../../assets/iconos/vespa3.png'
    moto2='../../../assets/iconos/vespa2.png'

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

}