import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { Router ,NavigationExtras,ActivatedRoute } from '@angular/router';
import { GlobalElementService} from '../../global-element.service';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-lavanderia',
  templateUrl: './lavanderia.page.html',
  styleUrls: ['./lavanderia.page.scss'],
})
export class LavanderiaPage implements OnInit {

  idLavanderia

  telefono:any
  direccion:any
  referencias:any
  horaLI:any
  horaLF:any
  horaSI:any
  horaSF:any
  nombreLavanderia:any

  avierto=true

  actualS=0

  imagenes=[
    '../../../assets/iconos/shutterstock_422824102.jpg',
    '../../../assets/iconos/700x420_lavanderia-autoservicio.jpg',
    '../../../assets/iconos/20180626143642-lavanderia.jpeg',
    '../../../assets/iconos/exe.jpg',
    '../../../assets/iconos/flaswash.png'
  ]

  tintoreria=[]
  planchados=[]
  otrosServicios=[]

  servicios=[
    {
      servicio:'Lavado de ropa',
      precio: 30,
      visto: false,
      elegido:false,
      unidad: 'Kilo'
    },
    {
      servicio:'Planchado',
      precio: 5,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },
    {
      servicio:'Ropa de ceda',
      precio: 20,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },

    {
      servicio:'Ropa de cama',
      precio: 10,
      visto: false,
      elegido:false,
      unidad: 'Pieza'
    },
    
  ]


  ofertas=[
    
      {
        titulo:'viernes 1x2',
        info:'Todos los Lunes y/o Viernes, agenda tu servicio de las 8:00 a las 14:00 horas y pagas tan solo $22.00 x Kilo',
        visto: false,
      },
      
      {
        titulo:'jueves 1x2',
        info:'Todos los Lunes y/o Viernes, agenda tu servicio de las 8:00 a las 14:00 horas y pagas tan solo $22.00 x Kilo',
        visto: false,
      }

      
    ]
  


  efectos=new Efectos()

  constructor(
    private router:Router,
    private global:GlobalElementService,
    private route: ActivatedRoute, 
    private socket:Socket,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      console.log("parametros",params);
      
     const id=JSON.parse(params.special)
     this.idLavanderia=id.id
     localStorage.setItem("lavanderia_id",id.id)
      console.log(this.idLavanderia);
      this.getServicios()
      this.getDatosLavanderia()


      socket.on('se_actulizo_una_lavanderia'+this.idLavanderia,(data)=>{
        console.log("actualiza");
        this.getServicios()
        this.getDatosLavanderia()
        this.presentToast()
      })     


      });

       

   }

  ngOnInit() {

    this.efectos.espavlecerTamaño(this.servicios.length,this.ofertas.length)
  }

  nuevoActual(num){
    this.actualS=num
    if(this.efectos.anterior!=null)
    this.efectos.ocultar(this.efectos.anterior,'')
    if(this.efectos.anterior2!=null)
    this.efectos.ocultar2(this.efectos.anterior2,'')
    this.efectos.anterior=null
    this.efectos.anterior2=null
  }
 /* irASolicitud(){
    this.router.navigate(['/solicitud'])
  }*/

  seleccionar(servicio){
        if(servicio.elegido==false)
          servicio.elegido=true
        else
          servicio.elegido=false
  }

  
  irASolicitud(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(
          {
            idLavanderia:this.idLavanderia,
            lavanderia:this.servicios,
            tintoreria:this.tintoreria,
            planchado:this.planchados
          })
      }
    };
    this.router.navigate(['solicitud'], navigationExtras);
  }


  getServicios(){
    this.servicios=null
    this.servicios=[]
    this.tintoreria=[]
    this.planchados=[]
    this.otrosServicios=[]
    this.global.getServiciosLavanderia(this.idLavanderia).subscribe(Response=>{
        //console.log(Response[0]);
        const ser=JSON.parse(Response[0].servicio)
        console.log(ser);

        ser.forEach(element => {
            let item={
              servicio: element.servicio,
              precio:element.precio,
              visto: false,
              elegido:false,
              unidad: element.unidad,
              descripcion:element.descripcion,
              imagen:'../../../assets/lavado/'+element.servicio+'.jpg'
            }

            this.servicios.push(item)

            console.log('servicio',this.servicios);
            
        });
        
    })


    //-----------------------------------------------------------------------------------

    this.global.getServiciosTintoreria(this.idLavanderia).subscribe(ResponseTintoreria=>{
      
      if(ResponseTintoreria.length>0){

        const ser=JSON.parse(ResponseTintoreria[0].servicio)
        //console.log(ser);
  
        ser.forEach(element => {
            let item={
              servicio: element.servicio,
              precio:element.precio,
              visto: false,
              elegido:false,
              unidad: element.unidad,
              descripcion:element.descripcion,
              imagen:'../../../assets/tintoreria/'+element.servicio+'.jpg'
            }
  
            this.tintoreria.push(item)
        });
        
        
      }
     

      //console.log(this.tintoreria);
      
    })
  //-----------------------------------------------------------------------------------

     this.global.getServiciosPlanchados(this.idLavanderia).subscribe(ResponsePlnachodos=>{
    

     if(ResponsePlnachodos.length>0){
      const ser=JSON.parse(ResponsePlnachodos[0].servicio)
      // console.log(ser);
      ser.forEach(element => {
        let item={
          servicio: element.unidad,
          precio:element.precio,
          visto: false,
          elegido:false,
          unidad: element.unidad,
          descripcion:element.descripcion,
          imagen:'../../../assets/planchado/docena.jpg'
        }

        this.planchados.push(item)
    });
     }
  

      //console.log(this.planchados);

     })

  //-----------------------------------------------------------------------------------


  this.global.getServiciosOtros(this.idLavanderia).subscribe(reposeOtros=>{
    
    if(reposeOtros.length>0){

      const ser=JSON.parse(reposeOtros[0].servicio)
      console.log("O",ser);


      ser.forEach(element => {
        let item={
          titulo:element.titulo,
          visto: false,
          info:element.descripcion
        }

        this.otrosServicios.push(item)
    });

    }
      

   // console.log(this.otrosServicios);
  })


  //-----------------------------------------------------------------------------------
  this.ofertas=null
  this.ofertas=[]
    this.global.getServiciosOfertar(this.idLavanderia).subscribe(ResponseOfertas=>{

      if(ResponseOfertas.length>0){
        const ser=JSON.parse(ResponseOfertas[0].servicio)
        console.log("O2",ser);
  
        ser.forEach(element => {
          let item={
            titulo:element.titulo,
            visto: false,
            info:element.descripcion
          }
  
          this.ofertas.push(item)
      });
  
      }

   


    })

  }


  getDatosLavanderia(){
    this.imagenes=[]
    this.global.getLavanderia(this.idLavanderia).subscribe(Response=>{
      console.log("get info=",Response);
      let direccion1:any=JSON.parse(Response.direccion)

      let fotos:any=JSON.parse(Response.fotografias)


     
     
      console.log("fotos",fotos);
      
      fotos.forEach(element => {
          this.imagenes.push(element.imagen)
      });

      this.direccion=direccion1.address
      this.referencias=direccion1.referencias
      this.telefono=Response.telefono

      let hora:any=JSON.parse(Response.horario_semana)
      
  
      

      this.horaLI=this.tConvert(hora.inicio)
      this.horaLF=this.tConvert(hora.fin)


      console.log("hora 1 ",hora);


      this.nombreLavanderia=Response.nombre_lavanderia

      let hora2:any=JSON.parse(Response.horario_sabado)

      this.horaSI=this.tConvert(hora2.inicio)
      this.horaSF=this.tConvert(hora2.fin)

      console.log("direccion",this.direccion);
      //console.log("hora",this.horaL);
      //console.log("hora2",this.horaS);

      
    })
  }



  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La lavandaría acaba de actualizar su información.',
      duration: 4000
    });
    toast.present();
  }
}
