import Integer from "@zxing/library/esm/core/util/Integer";

export class Libs {

    public capitalize(txt: String): String {
        console.log(txt);
        if(!txt)
            return txt;
        if(typeof txt == 'object'){
          txt=txt["log"];
        }
        let text = txt.toLowerCase();
        let firstLetter = txt.charAt(0);
        firstLetter = firstLetter.toUpperCase();
        let remaining = txt.slice(1);
        return firstLetter + remaining;
    }
    public iniciales(txt: String): String {
        
        let map_iniciales1= txt
            .split(' ')
            .map(it => it.charAt(0));
            let iniciales1 = map_iniciales1.slice(0, 1)
            .join('');
        let map_iniciales2 =  txt
                .split(' ')
                .map(it => it.charAt(0));
        let iniciales2 = map_iniciales2.slice(map_iniciales2.length-1,map_iniciales2.length)
                .join('');
        return this.capitalize(iniciales1).toString()+this.capitalize(iniciales2);
    }


    public validar_mail(mail){
        if (!mail.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
          return true;
        } else {
          return false;
        }
      }


      validar_celular(cod_pais,cod_area,celular) {

        let result = (cod_pais +cod_area + celular).match(/^[+]?[0-9]{2}([0-9]{2}[0-9]{8})$/);
        if (result !== null) {
          return true;
        }
        else {
          return false;
        }
      }
}