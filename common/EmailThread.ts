import { Email } from '../common/Email';
import { Contexto } from '../tnt-server/contexto';

export class EmailThread extends Contexto{
    threadName: string;
    threadEmail: Email[] = [];

   constructor(){
       super();
   }

   addEmail(newEmail: Email): void{

   }

   read(): void{

   }

   getThreadEmails(): Email[]{
       return null;
   }
}
