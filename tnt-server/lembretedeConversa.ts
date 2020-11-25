
export class LembreteDeConversas{
    ListadeDatas: string[] = ["25/11/2020"];

    criarLembrete(newReminder : string): boolean {
        if(!this.datajapassou(newReminder)){
            this.ListadeDatas.push(newReminder);
            return true;
        }else return false;
    }

    getDatas() : string[]{
        return this.ListadeDatas;
    }

    datajapassou(newReminder : string){
        var datahoje = new Date();
        var data :string = newReminder

        if(datahoje.getFullYear() < parseInt(data.substr(6,4))){
            return true;
        }

        if((datahoje.getMonth()+1) < parseInt(data.substr(3,2)) &&  datahoje.getFullYear() <= parseInt(data.substr(6,4))){
            return true;
        }

        if(datahoje.getDate() < parseInt(data.substr(0,2)) && (datahoje.getMonth()+1) <= parseInt(data.substr(3,2)) && datahoje.getFullYear() <= parseInt(data.substr(6,4))){
            return true;
        }

        return false;
    }
}