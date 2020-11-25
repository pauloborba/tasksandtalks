import {LembreteDeConversas} from './lembretedeConversa';

export class Contexto{

    mapids : Map < number, string >;

    constructor(){
        this.mapids = new Map();
        this.mapids.set(999,"01/01/1001");
        this.mapids.set(3,"24/11/2020");
        this.mapids.set(4,"25/11/2020");
    }

    getMap() : (number[] | string[])[]{
        var listacompleta = [(Array.from(this.mapids.keys())),(Array.from(this.mapids.values()))];
        return listacompleta;
    }

    criarNovoLembrete(lista : [number,string] ) : boolean{
        this.mapids.set(lista[0], lista[1]); 
        if(!this.datajapassou(lista[1])){
            this.mapids.set(lista[0], lista[1]);
            for (let [key, value] of this.mapids) {
                console.log(key, value);
            }
            return true;
        }
        return false; 
    }

    datajapassou(newReminder : string){
        var datahoje = new Date();
        var data :string = newReminder



        if(datahoje.getFullYear() >  parseInt(data.substr(6,4))){
            return true;
        }

        if((datahoje.getMonth()+1) > parseInt(data.substr(3,2)) &&  datahoje.getFullYear() >= parseInt(data.substr(6,4))){
            return true;
        }

        if(datahoje.getDate() >= parseInt(data.substr(0,2)) && (datahoje.getMonth()+1) >= parseInt(data.substr(3,2)) && datahoje.getFullYear() >= parseInt(data.substr(6,4))){
            return true;
        }

        return false;
    }

}