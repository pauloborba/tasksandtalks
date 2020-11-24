import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Event } from '../../../common/event';
import { EventService } from './event.service';

@Component({
  selector: 'eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})



export class EventosComponent{
  event: Event = {nome: "", data: "", tarefa: ""};
  events: Event[] = [];

  gravar(a: Event): void {
    this.events.push(a);
    this.event = {nome: "", data: "", tarefa: ""};
 }
}