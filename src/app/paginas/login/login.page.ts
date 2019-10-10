import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  
  constructor(
    private router: Router,
    private global:GlobalElementService
  ) { }

  ngOnInit() {
    this.ocultarPart('part2')
    this.ocultarPart('part3')
  
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
    document.getElementById(id).style.height='auto'
  }

  ocultarPart(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.height='0px'
  }



  iniciarSecion(){
      localStorage.setItem('secion','true')
      this.global.status_de_secion=true
      this.ocultarPart('part2')
      this.ocultarPart('part3')
      this.verPart('part1')
      this.router.navigate(['/inicio'])

  }
 
}
