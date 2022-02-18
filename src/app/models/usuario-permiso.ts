export class UsuarioPermiso {

    
    nombre:string;
    id:number;
    id_elemento_menu:number;
    grupo:string;
    icono:string;
    ruta:string;
    id_padre:number;
    submodulos:[UsuarioPermiso];
}
export class UsuarioPermisoArray{
    0:[UsuarioPermiso]
}