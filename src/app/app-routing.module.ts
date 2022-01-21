import { AuthGuardGuard } from './auth-guard.guard';
import { PatronGuard } from './patron.guard';
import { ProcesoAltaGuard } from './proceso-alta.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ValidacionEmpresaGuard } from './validacion-empresa.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/modulos/home/home.module').then( m => m.HomePageModule),canActivate: [AuthGuardGuard,PatronGuard,ProcesoAltaGuard,ValidacionEmpresaGuard]
  },
  {
    path: '',
    // redirectTo: 'validaridentidad',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'splash',
  //   loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule)
  // },
  {
    path: 'historial',
    loadChildren: () => import('./pages/modulos/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/modulos/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/onboarding/03-registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro1',
    loadChildren: () => import('./pages/onboarding/04-registro1/registro1.module').then( m => m.Registro1PageModule)
  },
  {
    path: 'confirmasms',
    loadChildren: () => import('./pages/seguridad/confirmasms/confirmasms.module').then( m => m.ConfirmasmsPageModule)
  },
  {
    path: 'cuentacreada',
    loadChildren: () => import('./pages/onboarding/05-cuentacreada/cuentacreada.module').then( m => m.CuentacreadaPageModule)
  },
  {
    path: 'preguntaslegales',
    loadChildren: () => import('./pages/onboarding/08-preguntaslegales/preguntaslegales.module').then( m => m.PreguntaslegalesPageModule)
  },
  {
    path: 'validaridentidad',
    loadChildren: () => import('./pages/seguridad/validaridentidad/validaridentidad.module').then( m => m.ValidaridentidadPageModule)
  },
  {
    path: 'validaridentidad1',
    loadChildren: () => import('./pages/seguridad/validaridentidad1/validaridentidad1.module').then( m => m.Validaridentidad1PageModule)
  },
  {
    path: 'validaridentidad2',
    loadChildren: () => import('./pages/seguridad/validaridentidad2/validaridentidad2.module').then( m => m.Validaridentidad2PageModule)
  },
  {
    path: 'validaridentidad3',
    loadChildren: () => import('./pages/seguridad/validaridentidad3/validaridentidad3.module').then( m => m.Validaridentidad3PageModule)
  },
  {
    path: 'revisarfotos',
    loadChildren: () => import('./pages/seguridad/revisarfotos/revisarfotos.module').then( m => m.RevisarfotosPageModule)
  },
  {
    path: 'procesarfotos',
    loadChildren: () => import('./pages/seguridad/procesarfotos/procesarfotos.module').then( m => m.ProcesarfotosPageModule)
  },
  {
    path: 'datospersonales',
    loadChildren: () => import('./pages/onboarding/06-datospersonales/datospersonales.module').then( m => m.DatospersonalesPageModule)
  },
  {
    path: 'datospersonales1',
    loadChildren: () => import('./pages/onboarding/07-datospersonales1/datospersonales1.module').then( m => m.Datospersonales1PageModule)
  },
  {
    path: 'datospersonales2',
    loadChildren: () => import('./pages/onboarding/09-datospersonales2/datospersonales2.module').then( m => m.Datospersonales2PageModule)
  },
  {
    path: 'registrofinalizado',
    loadChildren: () => import('./pages/onboarding/010-registrofinalizado/registrofinalizado.module').then( m => m.RegistrofinalizadoPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'ingresopatron',
    loadChildren: () => import('./pages/seguridad/ingresopatron/ingresopatron.module').then( m => m.IngresopatronPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lostpassword',
    loadChildren: () => import('./pages/seguridad/lostpassword/lostpassword.module').then( m => m.LostpasswordPageModule)
  },
  {
    path: 'lostpassword1',
    loadChildren: () => import('./pages/seguridad/lostpassword1/lostpassword1.module').then( m => m.Lostpassword1PageModule)
  },
  {
    path: 'lostpassword-confirma',
    loadChildren: () => import('./pages/seguridad/lostpassword-confirma/lostpassword-confirma.module').then( m => m.LostpasswordConfirmaPageModule)
  },
  {
    path: 'lostpassword-exito',
    loadChildren: () => import('./pages/seguridad/lostpassword-exito/lostpassword-exito.module').then( m => m.LostpasswordExitoPageModule)
  },
  {
    path: 'lostpassword-ayuda',
    loadChildren: () => import('./pages/seguridad/lostpassword-ayuda/lostpassword-ayuda.module').then( m => m.LostpasswordAyudaPageModule)
  },
  {
    path: 'lostpassword-ayuda-confirm',
    loadChildren: () => import('./pages/seguridad/lostpassword-ayuda-confirm/lostpassword-ayuda-confirm.module').then( m => m.LostpasswordAyudaConfirmPageModule)
  },
  {
    path: 'registro-cuentaexistente',
    loadChildren: () => import('./pages/onboarding/registro-cuentaexistente/registro-cuentaexistente.module').then( m => m.RegistroCuentaexistentePageModule)
  },
  {
    path: 'registro-cuentaexistente-si',
    loadChildren: () => import('./pages/onboarding/registro-cuentaexistente-si/registro-cuentaexistente-si.module').then( m => m.RegistroCuentaexistenteSiPageModule)
  },
  {
    path: 'registro-cuentaexistente-no',
    loadChildren: () => import('./pages/onboarding/registro-cuentaexistente-no/registro-cuentaexistente-no.module').then( m => m.RegistroCuentaexistenteNoPageModule)
  },
  {
    path: 'registro-cuentaexistente-ayuda',
    loadChildren: () => import('./pages/onboarding/registro-cuentaexistente-ayuda/registro-cuentaexistente-ayuda.module').then( m => m.RegistroCuentaexistenteAyudaPageModule)
  },
  {
    path: 'registro-cuentaexistente-ayuda-confirm',
    loadChildren: () => import('./pages/onboarding/registro-cuentaexistente-ayuda-confirm/registro-cuentaexistente-ayuda-confirm.module').then( m => m.RegistroCuentaexistenteAyudaConfirmPageModule)
  },
  {
    path: 'validaridentidad-mastarde',
    loadChildren: () => import('./pages/seguridad/validaridentidad-mastarde/validaridentidad-mastarde.module').then( m => m.ValidaridentidadMastardePageModule)
  },
  {
    path: 'validaridentidad-mastarde1',
    loadChildren: () => import('./pages/seguridad/validaridentidad-mastarde1/validaridentidad-mastarde1.module').then( m => m.ValidaridentidadMastarde1PageModule)
  },
  {
    path: 'validaridentidad-problema',
    loadChildren: () => import('./pages/seguridad/validaridentidad-problema/validaridentidad-problema.module').then( m => m.ValidaridentidadProblemaPageModule)
  },
  {
    path: 'validaridentidad-problema-confirm',
    loadChildren: () => import('./pages/seguridad/validaridentidad-problema-confirm/validaridentidad-problema-confirm.module').then( m => m.ValidaridentidadProblemaConfirmPageModule)
  },
  {
    path: 'registro-enespera',
    loadChildren: () => import('./pages/onboarding/registro-enespera/registro-enespera.module').then( m => m.RegistroEnesperaPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./pages/onboarding/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'preguntas-popup',
    loadChildren: () => import('./pages/onboarding/preguntas-popup/preguntas-popup.module').then( m => m.PreguntasPopupPageModule)
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./pages/modulos/menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'datos-cuenta',
    loadChildren: () => import('./pages/modulos/datos-cuenta/datos-cuenta.module').then( m => m.DatosCuentaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'amigos',
    loadChildren: () => import('./pages/modulos/amigos/amigos.module').then( m => m.AmigosPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'validaridentidad4',
    loadChildren: () => import('./pages/seguridad/validaridentidad4/validaridentidad4.module').then( m => m.Validaridentidad4PageModule)
  },
  // {
  //   path: 'preloader',
  //   loadChildren: () => import('./preloader/preloader.module').then( m => m.PreloaderPageModule)
  // },
  {
    path: 'pedir-amigo',
    loadChildren: () => import('./pages/modulos/pedir-amigo/pedir-amigo.module').then( m => m.PedirAmigoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'enviar-amigo',
    loadChildren: () => import('./pages/modulos/enviar-amigo/enviar-amigo.module').then( m => m.EnviarAmigoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link',
    loadChildren: () => import('./pages/modulos/pedir-amigo-link/pedir-amigo-link.module').then( m => m.PedirAmigoLinkPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'lista-amigos',
    loadChildren: () => import('./pages/modulos/lista-amigos/lista-amigos.module').then( m => m.ListaAmigosPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link2',
    loadChildren: () => import('./pages/modulos/pedir-amigo-link2/pedir-amigo-link2.module').then( m => m.PedirAmigoLink2PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },{
    path: 'historial',
    loadChildren: () => import('./pages/modulos/historial/historial.module').then( m => m.HistorialPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'agenda-links',
    loadChildren: () => import('./pages/modulos/agenda-links/agenda-links.module').then( m => m.AgendaLinksPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-transferencia',
    loadChildren: () => import('./pages/modulos/ingreso-transferencia/ingreso-transferencia.module').then( m => m.IngresoTransferenciaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-efectivo',
    loadChildren: () => import('./pages/modulos/ingreso-efectivo/ingreso-efectivo.module').then( m => m.IngresoEfectivoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'mi-cvu',
    loadChildren: () => import('./pages/modulos/mi-cvu/mi-cvu.module').then( m => m.MiCvuPageModule)
  },
  {
    path: 'ingreso-debito',
    loadChildren: () => import('./pages/modulos/ingreso-debito/ingreso-debito.module').then( m => m.IngresoDebitoPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingreso-debito2',
    loadChildren: () => import('./pages/modulos/pagar/pagar.module').then( m => m.PagarPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pagar',
    loadChildren: () => import('./pages/modulos/pagar/pagar.module').then( m => m.PagarPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'ingresa-pin',
    loadChildren: () => import('./pages/seguridad/ingresa-pin/ingresa-pin.module').then( m => m.IngresaPinPageModule)
  },
  {
    path: 'ingresa-pin-confirma',
    loadChildren: () => import('./pages/seguridad/ingresa-pin-confirma/ingresa-pin-confirma.module').then( m => m.IngresaPinConfirmaPageModule)
  },

  {
    path: 'pedir-amigo-desdelista',
    loadChildren: () => import('./pages/modulos/pedir-amigo-desdelista/pedir-amigo-desdelista.module').then( m => m.PedirAmigoDesdelistaPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-desdelista2',
    loadChildren: () => import('./pages/modulos/pedir-amigo-desdelista2/pedir-amigo-desdelista2.module').then( m => m.PedirAmigoDesdelista2PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'pedir-amigo-link3',
    loadChildren: () => import('./pages/modulos/pedir-amigo-link3/pedir-amigo-link3.module').then( m => m.PedirAmigoLink3PageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'agregar-amigo',
    loadChildren: () => import('./pages/modulos/agregar-amigo/agregar-amigo.module').then( m => m.AgregarAmigoPageModule)
  },
  {
    path: 'ingreso-dinero',
    loadChildren: () => import('./pages/modulos/ingreso-dinero/ingreso-dinero.module').then( m => m.IngresoDineroPageModule)
  },
  {
    path: 'retirar-dinero',
    loadChildren: () => import('./pages/seguridad/retirar-dinero/retirar-dinero.module').then( m => m.RetirarDineroPageModule)
  },
  {
    path: 'agregar-amigo2',
    loadChildren: () => import('./pages/modulos/agregar-amigo2/agregar-amigo2.module').then( m => m.AgregarAmigo2PageModule)
  },
  {
    path: 'ingresar-efectivo-monto',
    loadChildren: () => import('./pages/modulos/ingresar-efectivo-monto/ingresar-efectivo-monto.module').then( m => m.IngresarEfectivoMontoPageModule)
  },
  {
    path: 'changecel',
    loadChildren: () => import('./pages/modulos/changecel/changecel.module').then( m => m.ChangecelPageModule)
  },
  {
    path: 'changemail',
    loadChildren: () => import('./pages/modulos/changemail/changemail.module').then( m => m.ChangemailPageModule)
  },
  {
    path: 'lista-destinatarios',
    loadChildren: () => import('./pages/modulos/lista-destinatarios/lista-destinatarios.module').then( m => m.ListaDestinatariosPageModule)
  },
  {
    path: 'amigos-historial',
    loadChildren: () => import('./pages/modulos/amigos-historial/amigos-historial.module').then( m => m.AmigosHistorialPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/modulos/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'retiro-transferencia',
    loadChildren: () => import('./pages/modulos/retiro-transferencia/retiro-transferencia.module').then( m => m.RetiroTransferenciaPageModule)
  },
  {
    path: 'agregar-destinatario',
    loadChildren: () => import('./pages/modulos/agregar-destinatario/agregar-destinatario.module').then( m => m.AgregarDestinatarioPageModule)
  },
  {
    path: 'transferencia-monto',
    loadChildren: () => import('./pages/modulos/transferencia-monto/transferencia-monto.module').then( m => m.TransferenciaMontoPageModule)
  },
  {
    path: 'selecciona-metodo-pago',
    loadChildren: () => import('./pages/modulos/selecciona-metodo-pago/selecciona-metodo-pago.module').then( m => m.SeleccionaMetodoPagoPageModule)
  },
  {
    path: 'transferencia-confirma',
    loadChildren: () => import('./pages/modulos/transferencia-confirma/transferencia-confirma.module').then( m => m.TransferenciaConfirmaPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'warning',
    loadChildren: () => import('./warning/warning.module').then( m => m.WarningPageModule)
  },
  {
    path: 'lista-amigos-env',
    loadChildren: () => import('./pages/modulos/lista-amigos-env/lista-amigos-env.module').then( m => m.ListaAmigosEnvPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/modulos/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'detalle-transaccion',
    loadChildren: () => import('./pages/modulos/detalle-transaccion/detalle-transaccion.module').then( m => m.DetalleTransaccionPageModule)
  },
  {
    path: 'comprobante',
    loadChildren: () => import('./comprobante/comprobante.module').then( m => m.ComprobantePageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/modulos/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'personapfpj',
    loadChildren: () => import('./pages/onboarding/01-personapfpj/personapfpj.module').then( m => m.PersonapfpjPageModule)
  },
  {
    path: 'confirmaciones',
    loadChildren: () => import('./pages/modulos/confirmaciones/confirmaciones.module').then( m => m.ConfirmacionesPageModule)
  },
  {

    path: 'scanner-pagos',
    loadChildren: () => import('./pages/modulos/scanner-pagos/scanner-pagos.module').then( m => m.ScannerPagosPageModule)
  },
  {
    path: 'mis-tc',
    loadChildren: () => import('./pages/modulos/mis-tc/mis-tc.module').then( m => m.MisTcPageModule)
  },
  {
    path: 'pago-qr',
    loadChildren: () => import('./pages/modulos/pago-qr/pago-qr.module').then( m => m.PagoQrPageModule)
  

  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/modulos/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'cambiar-cuenta',
    loadChildren: () => import('./components/cambiar-cuenta/cambiar-cuenta.module').then( m => m.CambiarCuentaPageModule)
  },
  {
    path: 'valida-dni',
    loadChildren: () => import('./pages/onboarding/02-valida-dni/valida-dni.module').then( m => m.ValidaDniPageModule)
  },
  {
    path: 'confirma-email',
    loadChildren: () => import('./pages/seguridad/confirma-email/confirma-email.module').then( m => m.ConfirmaEmailPageModule)
  },
  {
    path: 'modificar-mail',
    loadChildren: () => import('./pages/seguridad/modificar-mail/modificar-mail.module').then( m => m.ModificarMailPageModule)
  },
  {
    path: 'modificar-cel',
    loadChildren: () => import('./pages/seguridad/modificar-cel/modificar-cel.module').then( m => m.ModificarCelPageModule)
  },
  {
    path: 'procesarfotoscargadas',
    loadChildren: () => import('./pages/seguridad/procesarfotoscargadas/procesarfotoscargadas.module').then( m => m.ProcesarfotoscargadasPageModule)
  },
  {
    path: 'confirmapaswword',
    loadChildren: () => import('./pages/seguridad/confirmapaswword/confirmapaswword.module').then( m => m.ConfirmapaswwordPageModule)
  },
  {
    path: 'registro-pass',
    loadChildren: () => import('./pages/onboarding/03-1registro-pass/registro-pass.module').then( m => m.RegistroPassPageModule)
  },
  {
    path: 'nuevo-usuario',
    loadChildren: () => import('./pages/modulos/nuevo-usuario/nuevo-usuario.module').then( m => m.NuevoUsuarioPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/modulos/usuarios/usuarios.module').then( m => m.UsuariosPageModule),canActivate: [AuthGuardGuard,ProcesoAltaGuard]
  },
  {
    path: 'usuarios-permiso',
    loadChildren: () => import('./pages/modulos/usuarios-permiso/usuarios-permiso.module').then( m => m.UsuariosPermisoPageModule),canActivate: [AuthGuardGuard]
  }








 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
