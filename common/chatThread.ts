import { Chat } from '../common/chat';
import { Contexto } from '../tnt-server/contexto';

export class ChatThread extends Contexto{
    threadName: string;
    threadChats: Chat[] = [ {sender: "juan",messageContent:"ola",sendDate:new Date()},
                            {sender: "julia",messageContent:"oie",sendDate:new Date()}];
    activateSnooze: Chat[] = [];
    bufferSnooze: Chat[] = [];
    horaDoSnooze: Date = new Date();
    snoozing: Date;

   constructor(){
       super();
   }

   addChat(newChat: Chat): void{
    let aux = new Date();
    let now = aux.getTime(); 
    let snoozeTime = new Date(this.horaDoSnooze.toString());
    let snoozingTime = snoozeTime.getTime();
    if(now >= snoozingTime){
        this.threadChats.push(newChat);
        console.log("adicionou no principal");
    }
    else{
        this.bufferSnooze.push(newChat);
        console.log(this.bufferSnooze);
    }
   }

   read(): void{

   }

   getThreadChats(): Chat[]{
    return this.threadChats;
   }
   
   applySnoozing(){
       return this.bufferSnooze;
   }

   addSnoozing(newSnoozing: Chat){
    //this.snoozing = newSnoozing;
    //return newSnoozing;
    console.log(newSnoozing);
    this.horaDoSnooze = new Date(newSnoozing.sendDate.toString());
    console.log(this.horaDoSnooze);
    setInterval(this.checkSnoozing, 1000);
   }

   checkSnoozing = () => {
        if (this.bufferSnooze) {

            let aux = new Date();     //aqui pega a hora de agora
            let now = aux.getTime();  //aqui converte essa hora de agora para um inteiro
            let snoozeTime = new Date(this.horaDoSnooze.toString());
            let snoozingTime = snoozeTime.getTime(); //aqui pega a hora do snooze         snoozeTime = horaDoSnooze.getTime()

            if(now >= snoozingTime) {
                for(let a of this.bufferSnooze){
                    this.threadChats.push(a);  //se sim, adiciona tudo que tá no buffer de Snooze no thread chats 
                } //aqui tu compara: now > snoozetime ?  
                console.log(this.bufferSnooze);
                console.log(this.threadChats);
                this.bufferSnooze.splice(0, this.bufferSnooze.length);   
                console.log(this.bufferSnooze);
                
                       
            }
        }
   }
}