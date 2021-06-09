declare var Decidir;
export class factoryDecidir {
    constructor(){}
    create (cybersource) {

        var decidirInstance = null;
        decidirInstance = new Decidir('https://live.decidir.com/api/v2', true);
        decidirInstance.setPublishableKey('792ead6671d24c59933a7394f13e7101');
        //      decidirInstance.setPublishableKey('e9cdb99fff374b5f91da4480c8dca741');
        let timeout = cybersource ? 20000 : 10000;
        decidirInstance.setTimeout(timeout);
        return decidirInstance;
    }
}