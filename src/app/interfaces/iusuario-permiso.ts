import { UsuarioPermiso } from '../models/usuario-permiso';
export interface IUsuarioPermiso {
    resultado:boolean,
    log:String| boolean,
    extras:[[UsuarioPermiso]]
}


export interface IUsuarioPermisoArray {
    0:Array<UsuarioPermiso>
}
export interface IUsuarioPermisoExtra {
    resultado:Boolean;
    log:String;
    extras:IUsuarioPermisoArray;
    
}