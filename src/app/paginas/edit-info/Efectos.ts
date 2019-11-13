

export class Efectos{


    constructor(){

    }



    next(mostrar,ocultar, cantidad){
        this.ocultarParte(ocultar)
        this.mostraParte(mostrar,cantidad)
    }


    mostraParte(id,cantidad){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height=''+cantidad+"%"
    }

    ocultarParte(id){
        document.getElementById(id).style.transition='0.5s'
        document.getElementById(id).style.height='0px'
    }
    

    



}