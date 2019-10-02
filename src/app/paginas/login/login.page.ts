import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tipoLogin=1
  
  constructor(
    private router: Router,
    private global:GlobalElementService
  ) { }

  ngOnInit() {
  }

  ocultarInicio(){
    document.getElementById('init').style.transition='0.7s'
    document.getElementById('init').style.overflow='hidden'
    document.getElementById('init').style.height='0px'
  }

  verInicio(){
    document.getElementById('init').style.transition='0.7s'
    document.getElementById('init').style.height='100%'
  }
  
  login(){
    this.tipoLogin=1
    this.ocultarInicio()
  }

  registrarce(){
    this.tipoLogin=0
    this.ocultarInicio()
  }

  iniciar(){
    this.verInicio()
    localStorage.setItem('secion','true')
    this.router.navigate(['/inicio'])
    this.global.status_de_secion=true
    
  }

}
