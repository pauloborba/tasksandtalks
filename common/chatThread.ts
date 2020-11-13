import { Chat } from 'chat';

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

   }
}