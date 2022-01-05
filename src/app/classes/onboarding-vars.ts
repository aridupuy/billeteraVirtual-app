export interface Vars{
    pfpj?,
    documento?,
    usuario?,
    password?,
    proceso_alta?,
    cod_pais?,
    cod_area?,
    celular?,
    mail?,
    revalidar?,
    login?,
    dni?,
    sexo?,
    cuit?,
    direccion?,
    numero?,
    piso?,
    depto?,
    cod_postal?,
    nacionalidad?,
    apellido?,
    fecha_nac?,
    provincia?,
    ciudad?,
    nombre?,
    nombre_completo?,
    valido_sms?,
    valido_ident?,
    valida_mail?,
    terminos_acepta?,
    foto_frente?,
    foto_frente_con_dni?,
    foto_dorso_dni?,
    foto_frente_dni?,
    estado_civil?,
    ocupacion?,
    fatca?,
    politico_expuesto?,
    sujeto_obligado?,
    cuil?,
    cuit_modificado?,
    logued?,
    platform?,
    relacion?,
    
}

export class  Onboarding_vars {

    static add(vars){
        let datos = JSON.parse(localStorage.getItem("varsOnboarding"));
        if(datos==null){
            datos={};
        }
        Object.entries(vars).forEach((variable)=>{
                datos[variable[0]]=variable[1];
            }
        );
        localStorage.setItem("varsOnboarding",JSON.stringify(datos));

    }
    static get():Vars{
        let json = JSON.parse(localStorage.getItem("varsOnboarding"));
        if(json == null){
            return JSON.parse("{}");
        }
        return json;
    }

    static destroy(){
        localStorage.removeItem("varsOnboarding");
    }


}