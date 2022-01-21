import { Usuario } from '../models/usuario';
export interface IUsuario{
    resultado:boolean,
    log:String| boolean,
    extras:[Usuario]
}