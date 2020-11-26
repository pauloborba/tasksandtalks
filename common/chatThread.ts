import { Chat } from '../common/chat';
import { Contexto } from '../tnt-server/contexto';

export class ChatThread extends Contexto{
    threadName: string;
    threadChats: Chat[] = [ {sender: "juan",messageContent:"ola",sendDate:new Date()},
                            {sender: "julia",messageContent:"oie",sendDate:new Date()}];
    bufferLembretes: Chat[] = []

   constructor(){
       super();
   }

   checkReminder = () => {

    if (this.bufferLembretes) {

        let flagLembretes = []

        for ( let a of this.bufferLembretes ) {   
                let aux = new Date();     
                let now = aux.getTime(); 

                let auxTime = new Date(a.sendDate.toString())
                let reminderTime = auxTime.getTime(); 

                if(now >= reminderTime) { 
                    this.threadChats.push(a);  
                    flagLembretes.push(true)    
                } else {
                    flagLembretes.push(false)
                }
            }
        let removed = 0;
        for ( let i = 0; i < flagLembretes.length; i++ ) {  
                if ( flagLembretes[i] ) {        
                    this.bufferLembretes.splice(i - removed, 1);     
                    removed += 1;    
                }
            }
        }
    }

   addChat(newChat: Chat): void{
    this.threadChats.push(newChat)
   }

   addReminder(newReminder: Chat) {
        
        this.bufferLembretes.push(newReminder);

        setInterval(this.checkReminder, 1000);        

   }

   getReminders() {
       return this.bufferLembretes;
   }

   read(): void{

   }

   getThreadChats(): Chat[]{
    return this.threadChats;
   }
}
