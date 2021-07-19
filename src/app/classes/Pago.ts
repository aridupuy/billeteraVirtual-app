import { Result } from '@zxing/library';
import { SaldoService } from './../service/saldo.service';
import { EstadoProcesoService } from './../service/estado-proceso.service';
import { Observable } from './../classes/observable';
import { Ipagar } from './../interfaces/Ipagar';
import { ContactoService } from './../service/contacto.service';
import { IngresaPinPage } from '../ingresa-pin/ingresa-pin.page';
import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
@Injectable()
export class Pago {
    constructor(public contacto: ContactoService, public modalCtrl: ModalController, public estado: EstadoProcesoService, public saldo: SaldoService) {
    }
    public progreso = 0;
    public id_proceso;
    public get_progreso() {
        return this.progreso;
    }
    async pago_contacto_saldo(data: Ipagar) {
        /* todos los metodos de pago deberan emitir el evento pagar-result*/
        var result: any;
        if (data.saldo != null) {

            await this.contacto.aceptar_pedido_saldo(data.deuda.id).then(d => {
                console.log(d);
                result = data;
            }).catch(err => {
                console.log(err);
                result =  {log:err,error:true};
                return false;
            });
            //aceptar pago con saldo

        }
        console.log(result);
        return result;
    }
    async pago_contacto_tarjeta(data: Ipagar) {
        var result: any;
        var execute = true;
        this.id_proceso = Math.random();
        console.log(this.id_proceso);

        await this.contacto.aceptar_pedido_tc(data.deuda.id, data.tarjeta_elegida, this.id_proceso).then(d => {
            console.log(d);
            execute = false;
            result = d;
        }).catch(err => {
            execute = false;
            throw err;
        });


        return data;
    }
    async recarcaSaldo(data: Ipagar) {
        var response;
        console.log(data);
        await this.saldo.recargar_saldo_td(data.deuda.monto, data.tarjeta_elegida).then((d: any) => {
            response = d;

        }).catch(e => {
            response = e;
        });
        return response;
    }
    public obtener_progreso() {
        console.log("obteniendo progreso");
        this.estado.obtener(this.id_proceso).then((data: any) => {
            this.progreso = data;
        });
    }
    registrar_observer() {
        /*Aqui se registran todos los metodos de pago */
        Observable.suscribe("pagar", async (data: Ipagar) => {
            Observable.notify("init-process", true);
            const modal2 = await this.modalCtrl.create({
                component: IngresaPinPage,
                componentProps: { tipo: "validar", pago: "true" }
            });

            modal2.onDidDismiss().then(async (modalDataResponse) => {
                let clave1;
                // console.log(modalDataResponse);
                clave1 = modalDataResponse.data;
                // localStorage.setItem("inBackground", "0");
                if (clave1)
                    this.ejecutar_metodo_pago(data).then((d: Ipagar) => {
                        // console.log(data);
                        if (d.error == undefined) {
                            d["error"] = false;
                            d.error = false;
                            d["mensaje"] = "Exitos";
                        }
                        Observable.notify("pagar-result", d);
                        Observable.notify("init-process", false);
                    }).catch(e => {
                        if (data["error"] == undefined || data["error"] == false)
                            data["error"] = e.log;
                        // console.log(data);
                        Observable.notify("pagar-result", data);
                        Observable.notify("init-process", false);
                    });
                else{
                    data["error"] = "Debemos validarte para continuar.";
                    Observable.notify("pagar-result", data);
                    Observable.notify("init-process", false);
                }
                return true;
            });
            // console.log("MODAL ABIERTO setitem 1");
            await modal2.present();

        });
    }
    ejecutar_metodo_pago(data: Ipagar) {
        return new Promise(async (resolve, reject) => {
            // console.log(data.deuda.tipo_deuda);
            switch (data.deuda.tipo_deuda) {
                /*habria que optimizar esto con la base */
                case "Contacto":
                    try {
                        if (data.saldo) {
                            // console.log("pago con saldo");
                            resolve(this.pago_contacto_saldo(data));
                        }

                        else if (data.tarjeta_elegida) {
                            // console.log("pago con tc/td");
                            resolve(this.pago_contacto_tarjeta(data));
                        }

                    } catch (e) {
                         console.error("excepcion capturada");
                        console.log(e);
                        console.error(e);
                        reject(e);
                    }
                    break;
                case "RecargaTd":
                case "Recargatd":
                    // console.log("aca PAGO RecargaTd");
                    let resp = await this.recarcaSaldo(data);
                    if (resp.resultado == false)
                        reject(resp);
                    else {
                        // console.log(resp);
                        resolve(resp);
                    }
                    break;
                default:
                    console.log("sale por default");
                    break;
            }
        });

    }
}