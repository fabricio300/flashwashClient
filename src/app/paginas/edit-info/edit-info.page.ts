import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { GlobalElementService } from 'src/app/global-element.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { error } from 'util';


@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {
    efectos=new Efectos()
    private formValidar:FormGroup
    private formRegistro : FormGroup


    infoCampos={
      nombre:false,
      correo:false,
      contrasenia:false,
      contrasenia2:false,
      telefono:false,
      apellidos:false
    }
  

    emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    nombreValido='[a-zA-ZÀ-ÿ ]{3,50}'
    apellidosValidos='[a-zA-ZÀ-ÿ ]{3,48}'
    contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
    numeroValido='[0-9]{10}'

    anterio
    mostrarInfoContraseniaValidar=false
    cambios_en_proceso=false
    actual=0


    lat: number;
    lng: number;
    zoom:number=16
    address:string=''
    referencias=''

  constructor(
    private formBuilder: FormBuilder,
    private alertacontroller: AlertController,
    private global:GlobalElementService,
    private nativeGeocoder: NativeGeocoder
  ) { 

    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.nombreValido),
        
      ])],
      /*contrasenia: ['',Validators.compose([
       // Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      contraseniaConfir:['',Validators.compose([
       // Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],*/
      telefono: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.numeroValido)
      ])],
      correo: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido)])
      ],
      apellidos:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.apellidosValidos)
      ])]
    });


    this.formValidar=this.formBuilder.group({
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
    });


    console.log("id usuario ",localStorage.getItem('idUser'));
    

  }

  ngOnInit() {
    this.getDatosusuario()
    this.efectos.ocultarParte('Dotos')
  }

  mostraInfoContrasenia(){
    if(this.mostrarInfoContraseniaValidar){
      this.mostrarInfoContraseniaValidar=false
    }else{
      this.mostrarInfoContraseniaValidar=true
    }

  }
  

  mostrarInfoCampo(tipo){   
    console.log("eci");
    if(this.anterio!=null && this.anterio!=tipo){
      switch(this.anterio){
        case 'correo': this.infoCampos.correo=false 
        break;
        case 'telefono': this.infoCampos.telefono=false
        break;
        case 'contrasenia':  this.infoCampos.contrasenia=false 
        break;
        case 'contrasenia2': this.infoCampos.contrasenia2=false 
        break;
        case 'nombre': this.infoCampos.nombre=false 
        break;
        case 'apellidos': this.infoCampos.apellidos=false 
        
        break;
      } 
    }

    switch(tipo){
      case 'correo': if(this.infoCampos.correo==true){ this.infoCampos.correo=false }else {this.infoCampos.correo=true}
      break;
      case 'telefono': if(this.infoCampos.telefono==true){ this.infoCampos.telefono=false }else {this.infoCampos.telefono=true}
      break;
      case 'contrasenia': if(this.infoCampos.contrasenia==true){ this.infoCampos.contrasenia=false }else {this.infoCampos.contrasenia=true}
      break;
      case 'contrasenia2': if(this.infoCampos.contrasenia2==true){ this.infoCampos.contrasenia2=false }else {this.infoCampos.contrasenia2=true}
      break;
      case 'nombre': if(this.infoCampos.nombre==true){ this.infoCampos.nombre=false }else {this.infoCampos.nombre=true}
      break;
      case 'apellidos': if(this.infoCampos.apellidos==true){ this.infoCampos.apellidos=false }else {this.infoCampos.apellidos=true}
      break;
    }  
    
    this.anterio=tipo
  }


  mostrarDatos(tipo){
      

    if(tipo==0){
      this.actual=0
      this.efectos.next('DatosUsuario','DireccionUsuario',88)
    }else{
      this.actual=1
      this.efectos.next('DireccionUsuario','DatosUsuario',88)
    }

    this.getDatosusuario()
  }

  async verAlerta(){
    const alerta=await this.alertacontroller.create({
      header:'Error',
      subHeader:'contraseña incorrecta',
      message:'vuelva a intentar',
      buttons:['Aceptar']

  })
  
  await alerta.present()
}
  








getDatosusuario(){

    this.global.getInfoUsuario(localStorage.getItem('idUser')).subscribe(Response=>{
      console.log("resultado ",Response);
      this.formRegistro.get('nombre').setValue(''+Response.nombres)
      this.formRegistro.get('apellidos').setValue(''+Response.apellidos)
      this.formRegistro.get('telefono').setValue(''+Response.telefono)
      this.formRegistro.get('correo').setValue(''+Response.correo_electronico)

      let direccion:any=JSON.parse(Response.direccion)
      
      console.log("direccion= ",direccion);

      this.address=direccion.address
      this.referencias=direccion.referencias
      this.lat=parseFloat(direccion.coordenadas.lat)
      this.lng=parseFloat(direccion.coordenadas.lon)
    })


}



markerDragEnd($event:any) {
  console.log($event);
  this.lat =parseFloat(''+$event.coords.lat);
  this.lng =parseFloat(''+$event.coords.lng);
  
  this.getAddress(this.lat, this.lng);
}



getAddress(latitude, longitude){
  this.address=''
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(latitude,longitude, options)
  .then((result: NativeGeocoderResult[]) =>{
    console.log("es este ",result[0])
      //console.log("es este ",result[0].thoroughfare,", ",result[0].subLocality,", ",result[0].postalCode,",",result[0].locality,", ",result[0].administrativeArea,", ",result[0].countryName);
      if(result[0].thoroughfare.length>0){
        this.address=this.address+result[0].thoroughfare+", "
      }
      if(result[0].subLocality.length>0){
        this.address=this.address+result[0].subLocality+", "
      }
      if(result[0].postalCode.length>0){
        this.address=this.address+result[0].postalCode+", "
      }
      this.address=this.address+result[0].locality+", "+result[0].administrativeArea+", "+result[0].countryCode

     
  })
  .catch((error: any) => console.log(error));
}



validar(){
  let item={
    correo_electronico:this.formRegistro.get('correo').value,
    contraseña:this.formValidar.get('contrasenia').value
  }

  this.global.login(item).subscribe(response=>{
    console.log(response);
    let echo:any=response
   
    this.efectos.next('Dotos','Autorizar',100)
  
  },error=>{
    console.log("error");
    this.verAlerta()
  })
}




actualizarDatos(){
  this.cambios_en_proceso=true
  let item={
    nombres:this.formRegistro.get('nombre').value,
    apellidos:this.formRegistro.get('apellidos').value,
    correo_electronico: this.formRegistro.get('correo').value,
    telefono: this.formRegistro.get('telefono').value,
    direccion:JSON.stringify({
      address:this.address,
      referencias:this.referencias,
      coordenadas:{lat:this.lat, lon:this.lng}
    })
  }


  this.global.editInfoUsuario(localStorage.getItem('idUser'),item).subscribe(response=>{
    console.log("acualizado",response);

      this.getDatosusuario()
      this.cambios_en_proceso=false
      this.verAlerta2()
  })

}


async verAlerta2(){
  const alerta=await this.alertacontroller.create({
    header:'Proceso finalizado',
    subHeader:'Cambios realizados',
    message:'Los cambios realizados han sido exitosos',
    buttons:['Aceptar']

})

await alerta.present()
}



}
