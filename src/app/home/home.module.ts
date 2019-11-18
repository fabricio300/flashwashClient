import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyBCt0-mEji1fHBi7itS0cf2rNE-LxhXTac'
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
