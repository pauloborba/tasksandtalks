import { Component, OnInit } from '@angular/core';
import { Contexto } from '../../../common/contexto';
import { Chat } from '../../../common/chat';
import { ContextoService } from './contexto.service';
import { stringify } from 'querystring';
import { PathLocationStrategy } from '@angular/common';

@Component({
    selector: 'app-contexto',
    templateUrl: './contexto.component.html',
    styleUrls: ['./contexto.component.css']
})
export class ContextoComponent implements OnInit {

  chats: Chat[] = [];
  constructor(private contextoService: ContextoService) {}

  flag: boolean = false
  
  popup = {
    sender: '',
    date: new Date()
  }
   
    setPopup(id: Chat): void {
      if(id.sender != this.popup.sender) this.flag = true;
      else this.flag = !this.flag

      this.popup.sender = id.sender;
      this.popup.date = id.sendDate
      
    }

    ngOnInit(): void {
      this.contextoService.getChat()
      .subscribe(
        as => { this.chats = as; },
        msg => { alert(msg.message); }
        );
    }
  }




