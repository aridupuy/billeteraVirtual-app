
export interface IRESTBarcode{
    resultado: any;
    log: any;
    extras:[IBarcode];
  }
  export interface IBarcode{
      barcode1:string,
      pmc:string,
      nroBoleta:string,
  }