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
    chats: Chat[] = [];
    constructor(private contextoService: ContextoService) {

    }
   
    ngOnInit(): void {
      this.contextoService.getChat()
             .subscribe(
               as => { this.chats = as; },
               msg => { alert(msg.message); }
              );
    }
  }
