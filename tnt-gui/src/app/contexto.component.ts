import { Component, OnInit } from '@angular/core';
import { Contexto } from '../../../common/contexto';
import { Chat } from '../../../common/chat';
import { ContextoService } from './contexto.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-contexto',
    templateUrl: './contexto.component.html',
    styleUrls: ['./contexto.component.css']
})
export class ContextoComponent implements OnInit {
    chat: Chat = new Chat();
    chats: Chat[] = [];
    logedIn: boolean = false;

    private updateSubscription: Subscription;

    constructor(private contextoService: ContextoService) {

    }
    
    sendMessage(c: Chat): void {
      if(c.sender!="" && c.messageContent!=""){
        this.logedIn = true;
        c.sendDate = new Date();
        this.contextoService.newMsg(c)
              .subscribe(
                ar => {
                  if (ar){
                    this.chats.push(ar);
                    this.chat = new Chat();
                    this.chat.sender = c.sender;
                  }
                  },
                msg => { alert(msg.message); }
              );
      }
   } 

    ngOnInit(): void {
      this.updateSubscription = interval(10).subscribe(
        (val) => { this.contextoService.getChat()
                      .subscribe(
                        as => { this.chats = as; },
                        msg => { alert(msg.message); }
           );
      });
    }
  }
