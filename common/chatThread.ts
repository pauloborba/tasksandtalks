import { Chat } from '../common/chat';
import { Contexto } from '../tnt-server/contexto';

export class ChatThread extends Contexto{
    threadName: string;
    threadChats: Chat[] = [];

   constructor(){
       super();
   }

   addChat(newChat: Chat): void{

   }

   read(): void{

   }

   getThreadChats(): Chat[]{
       return null;
   }
}
