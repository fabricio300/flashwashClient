export class Efectos{
    iconArrowDown='../../../assets/iconos/arrow-down-sign-to-navigate.png'
    iconArrowUp='../../../assets/iconos/up-arrow.png'
    enLavanderia='../../../assets/iconos/washing-machine (1).png'
    moto='../../../assets/iconos/vespa1.png'
    mapa='../../../assets/iconos/map.png'
    tienda='../../../assets/iconos/store.png'

    constructor(){

    }


    mostrarStatus(pedido){

        if(pedido.visto==true){
            pedido.visto=false;
            this.ocultarInfo(pedido.id)
        }else{
            pedido.visto=true;
            this.mostrarInfo(pedido.id)
        }
    }


    mostrarInfo(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='270px'
        document.getElementById(id).scrollIntoView(true)
    }

    ocultarInfo(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='0px'
    }

}