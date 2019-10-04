import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 
  

  ngOnInit() {
    this.openFirst()
    this.router.navigate(['/lolool'])
  }

  constructor(
    private menu: MenuController,
    private router: Router
    ) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  

}
