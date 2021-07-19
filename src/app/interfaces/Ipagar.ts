import { Deuda } from './../models/deuda';
import { Persona } from './../models/persona';
export interface Ipagar{
    saldo?:any,
    tarjeta_elegida?:any
    persona:Persona,
    deuda:Deuda,
    error?:any,
    log?:any
  }