import { Chat } from '../common/chat';
import { Contexto } from '../tnt-server/contexto';

export class ChatThread extends Contexto{
    threadName: string;
    threadChats: Chat[] = [];

   constructor(){
       super();
   }

   addChat(newChat: Chat): Chat{
    var result: Chat = null;
    result = new Chat();
    result.copyFrom(newChat);
    this.threadChats.push(result);
    return result;
   }

   read(): void{

   }

   getThreadChats(): Chat[]{
    return this.threadChats;
   }
}
