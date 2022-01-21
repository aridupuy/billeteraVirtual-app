import { UsuarioPermiso } from '../models/usuario-permiso';
export interface IUsuarioPermiso {
    resultado:boolean,
    log:String| boolean,
    extras:[[UsuarioPermiso]]
}