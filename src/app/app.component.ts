import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificaService } from '../app/notificaciones/notifica.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificaciones:NotificaService
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
     this.statusBar.backgroundColorByHexString('#ff0000')
    this.platform.backButton.observers.pop()
      //this.splashScreen.hide();
      this.notificaciones.suscrivirceAtema()
    });
  }
}
