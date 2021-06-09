import { Result } from '@zxing/library';
import { SaldoService } from './../service/saldo.service';
import { EstadoProcesoService } from './../service/estado-proceso.service';
import { Observable } from './../classes/observable';
import { Ipagar } from './../interfaces/Ipagar';
import { ContactoService } from './../service/contacto.service';
import { Injectable } from '@angular/core';
@Injectable()
export class Pago{
    constructor(public contacto:ContactoService,public estado:EstadoProcesoService,public saldo:SaldoService){
    }
    public progreso=0;
    public id_proceso;
    public get_progreso(){
        return this.progreso;
    }
    async pago_contacto_saldo(data:Ipagar){
        /* todos los metodos de pago deberan emitir el evento pagar-result*/
        var result: any;
        if(data.saldo!=null){

            await this.contacto.aceptar_pedido_saldo(data.deuda.id).then(d=>{
              console.log(d);
              result= data;
            }).catch(err=>{
                throw err;
            });
            //aceptar pago con saldo
            
        }
        console.log(result);
        return result;
    }
    async pago_contacto_tarjeta(data:Ipagar){
        var result: any;
        var execute=true;
        this.id_proceso = Math.random();
        console.log(this.id_proceso);
       
        await this.contacto.aceptar_pedido_tc(data.deuda.id,data.tarjeta_elegida,this.id_proceso).then(d=>{
            console.log(d);
            execute=false;
            result= data;
          }).catch(err=>{
                execute=false;  
                throw err;
          });
          
       
          return data;
    }
    async recarcaSaldo(data:Ipagar){
        var response;
        await this.saldo.recargar_saldo_td(data.deuda.monto,data.tarjeta_elegida).then((d:any)=>{
            response=d;

        }).catch(e=>{
            console.log("aca");
            response=e;
        });
        return response;
    }
    public obtener_progreso(){
        console.log("obteniendo progreso");
        this.estado.obtener(this.id_proceso).then((data:any)=>{
            this.progreso = data;
        });
    }
    registrar_observer(){
        /*Aqui se registran todos los metodos de pago */
        Observable.suscribe("pagar",async (data:Ipagar)=>{
            Observable.notify("init-process",true);
            this.ejecutar_metodo_pago(data).then((d:Ipagar)=>{
                if(d.error==undefined){
                    d["error"]=false;
                    d.error=false;
                    d["mensaje"]="Exitos";
                }
                Observable.notify("pagar-result",d);
                Observable.notify("init-process",false);
            }).catch(e=>{
                if(data["error"]==undefined || data["error"]==false)
                    data["error"]=e.log;
                Observable.notify("pagar-result",data);
                Observable.notify("init-process",false);
            });
          });
    }
    ejecutar_metodo_pago(data:Ipagar){
        return new Promise(async (resolve,reject)=>{
            
            switch(data.deuda.tipo_deuda){
                /*habria que optimizar esto con la base */
                case "Contacto":
                try{
                    if(data.saldo){
                        console.log("pago con saldo");
                        resolve(this.pago_contacto_saldo(data));
                    }
                        
                    else if(data.tarjeta_elegida){
                        console.log("pago con tc/td");   
                        resolve(this.pago_contacto_tarjeta(data));
                    }
                        
                }catch(e){
                    console.log(e);
                    reject(e);
                }
                break;
                case "RecargaTd":
                    let resp = await this.recarcaSaldo(data);
                    if(resp.resultado == false)
                        reject(resp);
                    else{
                        console.log(resp);
                        resolve(resp);
                    }
                    break;
              }
        });
        
    }
}