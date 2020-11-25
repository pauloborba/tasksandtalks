import { Component, OnInit } from '@angular/core';
import { Contexto } from '../../../common/contexto';
import { Chat } from '../../../common/chat';
import { ContextoService } from './contexto.service';

@Component({
    selector: 'app-contexto',
    templateUrl: './contexto.component.html',
    styleUrls: ['./contexto.component.css']
})
export class ContextoComponent implements OnInit {
    chat: Chat = new Chat();
    chats: Chat[] = [];
    constructor(private contextoService: ContextoService) {

    }
    
    sendMessage(c: Chat): void {
      if(c.sender!="" && c.messageContent!=""){
        c.sendDate = new Date();
        this.contextoService.newMsg(c)
              .subscribe(
                ar => {
                  if (ar){
                    this.chats.push(ar);
                    this.chat = new Chat();
                  }
                  },
                msg => { alert(msg.message); }
              );
      }
   } 

    ngOnInit(): void {
      this.contextoService.getChat()
             .subscribe(
               as => { this.chats = as; },
               msg => { alert(msg.message); }
              );
    }
  }
