import { Component, OnInit } from '@angular/core';
import { Contexto } from '../../../common/contexto';
import { Chat } from '../../../common/chat';
import { ContextoService } from './contexto.service';
import { interval, Subscription } from 'rxjs';
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

  flagaux: boolean = false
  activateSnooze: boolean = false
  

  
  dateSnoozing: Date = new Date()
  timeSnoozing: Date = new Date()
  private updateSubscription: Subscription;
  

  
   
    appearPopup(): void {
      this.flagaux = !this.flagaux; 
    }

    getSnoozeDate() {
      console.log(this.dateSnoozing)
      console.log(this.timeSnoozing)

      let aux: string = this.dateSnoozing.toString()
      let data: Array<string> = aux.split('-')
      console.log(data)

      aux = this.timeSnoozing.toString()
      let hora: Array<string> = aux.split(':')
      console.log(hora)

      const snoozeDate: Date = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]), parseInt(hora[0]), parseInt(hora[1]))
      
      console.log(snoozeDate)   

      
      let nextSnooze: Chat = {
        sender: "",
        messageContent: "",
        sendDate: snoozeDate
      }

      this.contextoService.criarSnoozing(nextSnooze).subscribe();

      this.flagaux = false;
    }



    ngOnInit(): void {
      this.updateSubscription = interval(1000).subscribe(
        (val) => { this.contextoService.getChat()
                      .subscribe(
                        as => { this.chats = as; },
                        msg => { alert(msg.message); }
           );
      });
    }
  }