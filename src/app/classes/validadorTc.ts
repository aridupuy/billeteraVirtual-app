import { Injectable } from '@angular/core';
@Injectable()
export class validadorTc {

    validar(ccNum) {
        let charCount = ccNum.length;
        if (charCount == 13 || charCount == 14 || charCount == 15 || charCount == 16) {
            var valid = this.isValid(ccNum, charCount);
            return valid;
        }
    }

    ValidarTarjeta(codigo){
        var msg = "Valor incorrecto";
        const VISA = /^4[0-9]{3}?[0-9]{4}?[0-9]{4}?[0-9]{4}$/;
        const MASTERCARD = /^5[1-5][0-9]{2}?[0-9]{4}?[0-9]{4}?[0-9]{4}$/;
        const AMEX = /^3[47][0-9]{13}$/;
        const CABAL = /^(6042|6043|6044|6045|6046|5896){4}[0-9]{12}$/;
        const NARANJA =   /^(589562|402917|402918|527571|527572|0377798|0377799)[0-9]*$/;
    
        console.log(codigo);
        console.log(codigo.match(MASTERCARD));
        if(this.luhn(codigo)){
            if(codigo.match(VISA)){
                return "visa";
            }
            if(codigo.match(MASTERCARD)){
                return "mastercard";
            }
            if(codigo.match(NARANJA)){
                return "naranja";
            }
            if(codigo.match(CABAL)){
                return "cabal";
            }
            if(codigo.match(AMEX)){
               return "amex";
            }
            return false;
        } else {
            return false;
        }
    }
    private luhn(value) {
        // Accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;
        // The Luhn Algorithm. It's so pretty.
        let nCheck = 0, bEven = false;
        value = value.replace(/\D/g, "");
        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);
            if (bEven && (nDigit *= 2) > 9) nDigit -= 9; nCheck +=  nDigit; bEven = !bEven;
        }
        return (nCheck % 10) == 0;
    }
    private isValid(ccNum, charCount) {
        var double = true;
        var numArr = [];
        var sumTotal = 0;
        for (let i = 0; i < charCount; i++) {
            var digit = parseInt(ccNum.charAt(i));

            if (double) {
                digit = digit * 2;
                digit = this.toSingle(digit);
                double = false;
            } else {
                double = true;
            }
            numArr.push(digit);
        }
        for (let i = 0; i < numArr.length; i++) {
            sumTotal += numArr[i];
        }
        var diff = eval((sumTotal % 10)+"");
        console.log(diff);
        console.log(diff == "0");
        return (diff == "0");
    }

    private toSingle(digit) {
        if (digit > 9) {
            var tmp = digit.toString();
            var d1 = parseInt(tmp.charAt(0));
            var d2 = parseInt(tmp.charAt(1));
            return (d1 + d2);
        } else {
            return digit;
        }
    }
}