import { Chat } from '../common/chat';
import { Contexto } from '../tnt-server/contexto';

export class ChatThread extends Contexto{
    threadName: string;
    threadChats: Chat[] = [ {sender: "juan",messageContent:"ola",sendDate:new Date()},
                            {sender: "julia",messageContent:"oie",sendDate:new Date()}];

   constructor(){
       super();
   }

   addChat(newChat: Chat): void{
    this.threadChats.push(newChat)
   }

   read(): void{

   }

   getThreadChats(): Chat[]{
    return this.threadChats;
   }
}
