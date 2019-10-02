import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeguimientoPage } from './seguimiento.page';

import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyBCt0-mEji1fHBi7itS0cf2rNE-LxhXTac'
    })
  ],
  declarations: [SeguimientoPage]
})
export class SeguimientoPageModule {}
