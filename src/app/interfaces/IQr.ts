import { Persona } from './../models/persona';
import { Deuda } from './../models/deuda';
export interface IQr{
    deuda:Deuda;
    persona:Persona;
}