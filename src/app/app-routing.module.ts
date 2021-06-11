import { AuthGuardGuard } from './auth-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'welcome',
    // redirectTo: 'validaridentidad',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro1',
    loadChildren: () => import('./registro1/registro1.module').then( m => m.Registro1PageModule)
  },
  {
    path: 'confirmasms',
    loadChildren: () => import('./confirmasms/confirmasms.module').then( m => m.ConfirmasmsPageModule)
  },
  {
    path: 'cuentacreada',
    loadChildren: () => import('./cuentacreada/cuentacreada.module').then( m => m.CuentacreadaPageModule)
  },
  {
    path: 'preguntaslegales',
    loadChildren: () => import('./preguntaslegales/preguntaslegales.module').then( m => m.PreguntaslegalesPageModule)
  },
  {
    path: 'validaridentidad',
    loadChildren: () => import('./validaridentidad/validaridentidad.module').then( m => m.ValidaridentidadPageModule)
  },
  {
    path: 'validaridentidad1',
    loadChildren: () => import('./validaridentidad1/validaridentidad1.module').then( m => m.Validaridentidad1PageModule)
  },
  {
    path: 'validaridentidad2',
    loadChildren: () => import('./validaridentidad2/validaridentidad2.module').then( m => m.Validaridentidad2PageModule)
  },
  {
    path: 'validaridentidad3',
    loadChildren: () => import('./validaridentidad3/validaridentidad3.module').then( m => m.Validaridentidad3PageModule)
  },
  {
    path: 'revisarfotos',
    loadChildren: () => import('./revisarfotos/revisarfotos.module').then( m => m.RevisarfotosPageModule)
  },
  {
    path: 'procesarfotos',
    loadChildren: () => import('./procesarfotos/procesarfotos.module').then( m => m.ProcesarfotosPageModule)
  },
  {
    path: 'datospersonales',
    loadChildren: () => import('./datospersonales/datospersonales.module').then( m => m.DatospersonalesPageModule)
  },
  {
    path: 'datospersonales1',
    loadChildren: () => import('./datospersonales1/datospersonales1.module').then( m => m.Datospersonales1PageModule)
  },
  {
    path: 'datospersonales2',
    loadChildren: () => import('./datospersonales2/datospersonales2.module').then( m => m.Datospersonales2PageModule)
  },
  {
    path: 'registrofinalizado',
    loadChildren: () => import('./registrofinalizado/registrofinalizado.module').then( m => m.RegistrofinalizadoPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'ingresopatron',
    loadChildren: () => import('./ingresopatron/ingresopatron.module').then( m => m.IngresopatronPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword',
    loadChildren: () => import('./lostpassword/lostpassword.module').then( m => m.LostpasswordPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword1',
    loadChildren: () => import('./lostpassword1/lostpassword1.module').then( m => m.Lostpassword1PageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword-confirma',
    loadChildren: () => import('./lostpassword-confirma/lostpassword-confirma.module').then( m => m.LostpasswordConfirmaPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword-exito',
    loadChildren: () => import('./lostpassword-exito/lostpassword-exito.module').then( m => m.LostpasswordExitoPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword-ayuda',
    loadChildren: () => import('./lostpassword-ayuda/lostpassword-ayuda.module').then( m => m.LostpasswordAyudaPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'lostpassword-ayuda-confirm',
    loadChildren: () => import('./lostpassword-ayuda-confirm/lostpassword-ayuda-confirm.module').then( m => m.LostpasswordAyudaConfirmPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'registro-cuentaexistente',
    loadChildren: () => import('./registro-cuentaexistente/registro-cuentaexistente.module').then( m => m.RegistroCuentaexistentePageModule)
  },
  {
    path: 'registro-cuentaexistente-si',
    loadChildren: () => import('./registro-cuentaexistente-si/registro-cuentaexistente-si.module').then( m => m.RegistroCuentaexistenteSiPageModule)
  },
  {
    path: 'registro-cuentaexistente-no',
    loadChildren: () => import('./registro-cuentaexistente-no/registro-cuentaexistente-no.module').then( m => m.RegistroCuentaexistenteNoPageModule)
  },
  {
    path: 'registro-cuentaexistente-ayuda',
    loadChildren: () => import('./registro-cuentaexistente-ayuda/registro-cuentaexistente-ayuda.module').then( m => m.RegistroCuentaexistenteAyudaPageModule)
  },
  {
    path: 'registro-cuentaexistente-ayuda-confirm',
    loadChildren: () => import('./registro-cuentaexistente-ayuda-confirm/registro-cuentaexistente-ayuda-confirm.module').then( m => m.RegistroCuentaexistenteAyudaConfirmPageModule)
  },
  {
    path: 'validaridentidad-mastarde',
    loadChildren: () => import('./validaridentidad-mastarde/validaridentidad-mastarde.module').then( m => m.ValidaridentidadMastardePageModule)
  },
  {
    path: 'validaridentidad-mastarde1',
    loadChildren: () => import('./validaridentidad-mastarde1/validaridentidad-mastarde1.module').then( m => m.ValidaridentidadMastarde1PageModule)
  },
  {
    path: 'validaridentidad-problema',
    loadChildren: () => import('./validaridentidad-problema/validaridentidad-problema.module').then( m => m.ValidaridentidadProblemaPageModule)
  },
  {
    path: 'validaridentidad-problema-confirm',
    loadChildren: () => import('./validaridentidad-problema-confirm/validaridentidad-problema-confirm.module').then( m => m.ValidaridentidadProblemaConfirmPageModule)
  },
  {
    path: 'registro-enespera',
    loadChildren: () => import('./registro-enespera/registro-enespera.module').then( m => m.RegistroEnesperaPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'preguntas-popup',
    loadChildren: () => import('./preguntas-popup/preguntas-popup.module').then( m => m.PreguntasPopupPageModule)
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'datos-cuenta',
    loadChildren: () => import('./datos-cuenta/datos-cuenta.module').then( m => m.DatosCuentaPageModule),canActivate: [AuthGuardGuard]
  },
  {
    path: 'amigos',
    loadChildren: () => import('./amigos/amigos.module').then( m => m.AmigosPageModule)
  },
  {
    path: 'validaridentidad4',
    loadChildren: () => import('./validaridentidad4/validaridentidad4.module').then( m => m.Validaridentidad4PageModule)
  },
  {
    path: 'preloader',
    loadChildren: () => import('./preloader/preloader.module').then( m => m.PreloaderPageModule)
  },
  {
    path: 'pedir-amigo',
    loadChildren: () => import('./pedir-amigo/pedir-amigo.module').then( m => m.PedirAmigoPageModule)
  },
  {
    path: 'pedir-amigo-link',
    loadChildren: () => import('./pedir-amigo-link/pedir-amigo-link.module').then( m => m.PedirAmigoLinkPageModule)
  },
  {
    path: 'lista-amigos',
    loadChildren: () => import('./lista-amigos/lista-amigos.module').then( m => m.ListaAmigosPageModule)
  },
  {
    path: 'pedir-amigo-link2',
    loadChildren: () => import('./pedir-amigo-link2/pedir-amigo-link2.module').then( m => m.PedirAmigoLink2PageModule)
  },{
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
