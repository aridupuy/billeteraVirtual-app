import { int } from "@zxing/library/esm/customTypings";

export class Usuario{
    documento:string;
    nombre:string;
    username:string;
    id:string|int;
    titular:boolean;
    activo:int|boolean;
    email?:string;
    telefono?:string;
    codArea?:string;
    tipodoc?:string;
    cod_pais?:string;
}
