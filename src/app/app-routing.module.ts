import { AuthGuardGuard } from './auth-guard.guard';
import { PatronGuard } from './patron.guard';
import { ProcesoAltaGuard } from './proceso-alta.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate: [AuthGuardGuard,PatronGuard,ProcesoAltaGuard]
  },
  {
    path: '',
    // redirectTo: 'validaridentidad',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
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
    loadChildren: () => import('./ingresopatron/ingresopatron.module').then( m => m.IngresopatronPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword',
    loadChildren: () => import('./lostpassword/lostpassword.module').then( m => m.LostpasswordPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword1',
    loadChildren: () => import('./lostpassword1/lostpassword1.module').then( m => m.Lostpassword1PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword-confirma',
    loadChildren: () => import('./lostpassword-confirma/lostpassword-confirma.module').then( m => m.LostpasswordConfirmaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword-exito',
    loadChildren: () => import('./lostpassword-exito/lostpassword-exito.module').then( m => m.LostpasswordExitoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword-ayuda',
    loadChildren: () => import('./lostpassword-ayuda/lostpassword-ayuda.module').then( m => m.LostpasswordAyudaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword-ayuda-confirm',
    loadChildren: () => import('./lostpassword-ayuda-confirm/lostpassword-ayuda-confirm.module').then( m => m.LostpasswordAyudaConfirmPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
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
    loadChildren: () => import('./menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'datos-cuenta',
    loadChildren: () => import('./datos-cuenta/datos-cuenta.module').then( m => m.DatosCuentaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'amigos',
    loadChildren: () => import('./amigos/amigos.module').then( m => m.AmigosPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
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
    loadChildren: () => import('./pedir-amigo/pedir-amigo.module').then( m => m.PedirAmigoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link',
    loadChildren: () => import('./pedir-amigo-link/pedir-amigo-link.module').then( m => m.PedirAmigoLinkPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lista-amigos',
    loadChildren: () => import('./lista-amigos/lista-amigos.module').then( m => m.ListaAmigosPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link2',
    loadChildren: () => import('./pedir-amigo-link2/pedir-amigo-link2.module').then( m => m.PedirAmigoLink2PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },{
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'agenda-links',
    loadChildren: () => import('./agenda-links/agenda-links.module').then( m => m.AgendaLinksPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-transferencia',
    loadChildren: () => import('./ingreso-transferencia/ingreso-transferencia.module').then( m => m.IngresoTransferenciaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-efectivo',
    loadChildren: () => import('./ingreso-efectivo/ingreso-efectivo.module').then( m => m.IngresoEfectivoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'mi-cvu',
    loadChildren: () => import('./mi-cvu/mi-cvu.module').then( m => m.MiCvuPageModule)
  },
  {
    path: 'ingreso-debito',
    loadChildren: () => import('./ingreso-debito/ingreso-debito.module').then( m => m.IngresoDebitoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-debito2',
    loadChildren: () => import('./ingreso-debito2/ingreso-debito2.module').then( m => m.IngresoDebito2PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingresa-pin',
    loadChildren: () => import('./ingresa-pin/ingresa-pin.module').then( m => m.IngresaPinPageModule)
  },
  {
    path: 'ingresa-pin-confirma',
    loadChildren: () => import('./ingresa-pin-confirma/ingresa-pin-confirma.module').then( m => m.IngresaPinConfirmaPageModule)
  },

  {
    path: 'pedir-amigo-desdelista',
    loadChildren: () => import('./pedir-amigo-desdelista/pedir-amigo-desdelista.module').then( m => m.PedirAmigoDesdelistaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-desdelista2',
    loadChildren: () => import('./pedir-amigo-desdelista2/pedir-amigo-desdelista2.module').then( m => m.PedirAmigoDesdelista2PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link3',
    loadChildren: () => import('./pedir-amigo-link3/pedir-amigo-link3.module').then( m => m.PedirAmigoLink3PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'agregar-amigo',
    loadChildren: () => import('./agregar-amigo/agregar-amigo.module').then( m => m.AgregarAmigoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
