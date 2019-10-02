import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'menu', loadChildren: './paginas/menu/menu.module#MenuPageModule' },
  { path: 'inicio', loadChildren: './paginas/inicio/inicio.module#InicioPageModule' },
  { path: 'status', loadChildren: './paginas/status/status.module#StatusPageModule' },
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'seguimiento', loadChildren: './paginas/seguimiento/seguimiento.module#SeguimientoPageModule' },
  { path: 'lavanderia', loadChildren: './paginas/lavanderia/lavanderia.module#LavanderiaPageModule' },
  { path: 'solicitud', loadChildren: './paginas/solicitud/solicitud.module#SolicitudPageModule' },
  { path: 'guardados', loadChildren: './paginas/guardados/guardados.module#GuardadosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
