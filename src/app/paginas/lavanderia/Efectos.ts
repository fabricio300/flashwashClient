
export class Efectos{

    //iconos
    direccion='../../../assets/iconos/placeholder.png'
    correo='../../../assets/iconos/at.png'
    iconCel='../../../assets/iconos/call-answer.png'
    iconUrl='../../../assets/iconos/url.png'
    iconArrowDown='../../../assets/iconos/arrow-down-sign-to-navigate.png'
    iconArrowUp='../../../assets/iconos/chevron.png'
    iconWash='../../../assets/iconos/washing-machine (1).png'
    horario='../../../assets/iconos/clock-circular-outline (1).png'
    more='../../../assets/iconos/down-chevron (1).png'
    promo1='../../../assets/iconos/tag.png'
    promo2='../../../assets/iconos/tag (1).png'
    //efectos de servcio
    anterior
    anterior2
    tamanio
    tamanio2
    constructor(){
            

    }

    espavlecerTamaño(cantidad, cantidad2){
        this.tamanio=(cantidad*74)
        this.tamanio2=(cantidad2*75)
        //document.getElementById('services').style.background="red"
        document.getElementById('services').style.height=''+this.tamanio+'px'
        document.getElementById('ofertasX').style.height=''+this.tamanio2+'px'
       
    }
    


    viewInfoService(servicio){

        if(this.anterior!=null && servicio.servicio != this.anterior.servicio)
            this.ocultar(this.anterior)

        if(servicio.visto==true){
            this.ocultar(servicio)
        }else{
            this.mostrar(servicio)
        }

        this.anterior=servicio
    }


    mostrar(servicio){
        servicio.visto=true
        document.getElementById('services').style.height=''+(this.tamanio+200)+"px"
        document.getElementById(servicio.servicio).style.transition='0.5s'
        document.getElementById(servicio.servicio).style.height=''+200+"px"
       // document.getElementById(servicio.servicio).scrollIntoView(true)
    }


    ocultar(servicio){
        servicio.visto=false
        document.getElementById(servicio.servicio).style.transition='0.5s'
        document.getElementById(servicio.servicio).style.height=''+0+"px"
        document.getElementById('services').style.height=''+(this.tamanio)+"px"
    }











    viewOfert(oferta){

        if(this.anterior2!=null && oferta.titulo != this.anterior2.titulo)
            this.ocultar2(this.anterior2)

        if(oferta.visto==true){
            this.ocultar2(oferta)
        }else{
            this.mostrar2(oferta)
        }

        this.anterior2=oferta
    }


    mostrar2(oferta){
        oferta.visto=true
        document.getElementById('ofertasX').style.height=''+(this.tamanio2+200)+"px"
        document.getElementById(oferta.titulo).style.transition='0.5s'
        document.getElementById(oferta.titulo).style.height=''+200+"px"
        document.getElementById(oferta.titulo).scrollIntoView(true)
    }


    ocultar2(oferta){
        oferta.visto=false
        document.getElementById(oferta.titulo).style.transition='0.5s'
        document.getElementById(oferta.titulo).style.height=''+0+"px"
        document.getElementById('ofertasX').style.height=''+(this.tamanio2)+"px"
    }

}