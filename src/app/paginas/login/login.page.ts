import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';

import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NotificaService } from '../../notificaciones/notifica.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  actualRegitrar=0
  private formRegistro : FormGroup
  private formInicio:FormGroup

  infoCampos={
    nombre:false,
    correo:false,
    contrasenia:false,
    contrasenia2:false,
    telefono:false,
    apellidos:false
  }

  infoCampoInicio={
    nombre:false,
    contrasenia:false,
  }

  emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  nombreValido='[a-zA-ZÀ-ÿ ]{3,50}'
  apellidosValidos='[a-zA-ZÀ-ÿ ]{3,48}'
  contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
  numeroValido='[0-9]{10}'

  anterio:any
  
  constructor(
    private router: Router,
    private global:GlobalElementService,
    private formBuilder: FormBuilder,
    private alertacontroller: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private notificacion:NotificaService
  ) {

    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.nombreValido),
        
      ])],
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      contraseniaConfir:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
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


    this.formInicio=this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido),
      ])],
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
    });
   
  }


  

  ngOnInit() {
    this.ocultarPart('part2')
    this.ocultarPart('part3')
    this.getPosicionActual()
  }


  goOP(id){
      this.verPart(id)
      this.ocultarPart('part1')
  }

  retornar(id){
      this.ocultarPart(id)
      this.verPart('part1')
  }




  verPart(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.height='100%'
  }

  ocultarPart(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.height='0px'
  }



  iniciar(id){
      localStorage.setItem('secion','true')
      localStorage.setItem('idUser',''+id)
      this.global.status_de_secion=true
      this.notificacion.suscrivirceAtema()
      this.router.navigate(['/inicio'])


  }
 
  next(){
    this.actualRegitrar=1
    
    this.mostrarInfoCampo(this.anterio)
  }

  back(){
    this.actualRegitrar=0
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

  mostrarInfoCampoInicio(tipo){   
    console.log("eci");
    if(this.anterio!=null && this.anterio!=tipo){
      switch(this.anterio){
        case 'contrasenia':  this.infoCampoInicio.contrasenia=false 
        break;
        case 'nombre': this.infoCampoInicio.nombre=false 
        break;
      } 
    }

    switch(tipo){ 
      case 'contrasenia': if(this.infoCampoInicio.contrasenia==true){ this.infoCampoInicio.contrasenia=false }else {this.infoCampoInicio.contrasenia=true}
      break;
      case 'nombre': if(this.infoCampoInicio.nombre==true){ this.infoCampoInicio.nombre=false }else {this.infoCampoInicio.nombre=true}
      break;
    }  
    
    this.anterio=tipo
  }


  irARecuperarPassword(){
    this.router.navigate(['/resetar'])
  }




 async Registrar(){
    let item={
      nombres:this.formRegistro.get('nombre').value,
      apellidos:this.formRegistro.get('apellidos').value,
      correo_electronico: this.formRegistro.get('correo').value,
      contraseña: this.formRegistro.get('contrasenia').value,
      telefono: this.formRegistro.get('telefono').value,
      direccion:JSON.stringify({
        address:this.address,
        referencias:this.referencias,
        coordenadas:{lat:this.lat, lon:this.lng}
      })
    }


    this.global.registrar(item).subscribe(response=>{
      console.log("registrado",response);
      let echo:any=response
      this.iniciar(''+echo.id)
    })

  }



  iniciarSesion(){
    let item={
      correo_electronico:this.formInicio.get('nombre').value,
      contraseña:this.formInicio.get('contrasenia').value
    }

    this.global.login(item).subscribe(response=>{
      console.log(response);
      let echo:any=response
      console.log("EEe",echo[0].id);
      
      this.iniciar(''+echo[0].id)
    },error=>{
      console.log("error");
      this.verAlerta()
    })


    
  }


  async verAlerta(){
    const alerta=await this.alertacontroller.create({
      header:'Error',
      subHeader:'Correo o contraseña incorrectos',
      message:'vuelva a intentar',
      buttons:['Aceptar']

  })

  await alerta.present()
  }












  lat: number;
  lng: number;
  zoom:number=16
  address:string=''
  referencias=''

  getPosicionActual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=parseFloat(''+resp.coords.latitude)
      this.lng=parseFloat(''+resp.coords.longitude)
      this.getAddress(this.lat, this.lng);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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

}
