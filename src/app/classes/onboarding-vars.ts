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
    login?
    
}

export class  Onboarding_vars {

    static add(vars){
        let datos = JSON.parse(localStorage.getItem("varsOnboarding"));
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


}