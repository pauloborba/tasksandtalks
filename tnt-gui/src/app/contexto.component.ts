import { Component, OnInit, NgModule } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { Contexto } from '../../../common/contexto';
import { Chat } from '../../../common/chat';
import { ContextoService } from './contexto.service';
import { stringify } from 'querystring';
import { PathLocationStrategy, Time } from '@angular/common';

@Component({
    selector: 'app-contexto',
    templateUrl: './contexto.component.html',
    styleUrls: ['./contexto.component.css']
})
export class ContextoComponent implements OnInit {

  private updateSubscription: Subscription;

  chats: Chat[] = [];
  constructor(private contextoService: ContextoService) {}

  flag: boolean = false

  dateReminder: Date = new Date()
  timeReminder: Date = new Date()
  
  popup: Chat = {
    sender: '',
    messageContent: '',
    sendDate: new Date()
  }

  
  setPopup(id: Chat): void {

    if(id.sender != this.popup.sender) this.flag = true;
    else this.flag = !this.flag
    this.popup.sender = id.sender;
    this.popup.messageContent = id.messageContent
    this.popup.sendDate = id.sendDate
    
    }
    
    setDataReminder() {
      console.log(this.dateReminder)
      console.log(this.timeReminder)

      let aux: string = this.dateReminder.toString()
      let data: Array<string> = aux.split('-')

      aux = this.timeReminder.toString()
      let hora: Array<string> = aux.split(':')

      const example: Date = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]), parseInt(hora[0]), parseInt(hora[1]), parseInt(hora[2]))
      console.log(example)
      
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
  
  // blockCalendar() {
  //   const dataAtual = new Date()

  //   const year = dataAtual.getFullYear()
  //   const month = dataAtual.getMonth()
  //   const day = dataAtual.getDate()

  //   const dataAtualString = `${year}-${month}-${day}`

  //   const inputElement = document.querySelector("#data")
  //   console.log(inputElement)

  // }

  
  
  