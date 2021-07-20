/** Reinventando la rueda 
 * hecho orgullosamente por mi **/

 class  Observer {
  private funcion;
  constructor(funcion){
    this.setFunction(funcion);
  }
  public setFunction(funcion){
    this.funcion=funcion;
  }
  public notify(variables){
    return new Promise(async (resolve,reject) => {
      resolve(this.funcion(variables));
    });
  }
}

export class Observable {
  public static Observers:Observer[]=[];
    public  static suscribe(titulo,funcion){
      return new Promise(async(resolve,reject)=>{
        let observer = new Observer(funcion);
        if(typeof this.Observers[titulo]=='undefined'){
          this.Observers[titulo]=observer;
          resolve(observer);
        }
        else{
          console.log("RESUSCRIPTO A "+titulo);
          resolve(this.Observers[titulo]);
        }
      });
      
      
    }
    public static unsuscribe(titulo){
      return new Promise(async (resolve,reject)=>{
        if(typeof this.Observers[titulo]=='undefined')
          reject(false);
        resolve(this.Observers.splice(titulo,1));
      })
      
    }
    public static notify(titulo,variables){
      console.log("notificando "+titulo);
      if(typeof this.Observers[titulo] !== 'undefined'){
          this.Observers[titulo].notify(variables).then(vars=>{
            return vars;
          }).catch((e)=>{
            throw("error en Observable "+e);
          });
        }
        else {
          throw "error en Observable (No existe el evento) " + titulo + " ("+JSON.stringify(variables)+")";
        }
           
    };
}