import { UtilsService } from './../service/utils.service';
export class IdentificadorEntidad {
    public entidad;
    public data;
    constructor(public Utils:UtilsService,id_entidad,data){
        this.data=data;
        this.entidad=id_entidad;
    }
    public async obtener_datos(){
        let datosReturn;
        console.log(this.entidad);
        switch(this.entidad){
            case "7":
                datosReturn={nombre_completo:this.data.nombre+" "+this.data.apellido,alias:this.data.alias};
                break;
            case "18":
                await this.Utils.obtener_datos_entidad(9,this.data.id_usuario_contacto).then(data=>{
                    datosReturn=data;
                }).catch(err=>{
                    datosReturn=false;
                })
                break;
            default:
                await this.Utils.obtener_datos_entidad(2,this.data.id_cuenta).then(data=>{
                    datosReturn=data;
                }).catch(err=>{
                    datosReturn=false;
                })
                break;
        }
        return datosReturn
    }
}
