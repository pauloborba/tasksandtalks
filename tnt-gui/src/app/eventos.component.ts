import { Variable } from '@angular/compiler/src/render3/r3_ast';
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



export class EventosComponent implements OnInit{
  event: Event = {nome: "", data: "", hora: "", tarefas: [""]};
  events: Event[] = [{nome: "Preparar Aula de Requisitos", data: "15/12/2020", hora: "08:00", tarefas: [""]},{nome: "Preparar seminario da CBsoft", data: "20/12/2020", hora: "12:00", tarefas: [""]}];
  calendarEvent: Event = {nome: "Monitoria de InfraSoft", data: "16/12/2020", hora:"19:00", tarefas:[""]};
  mostrarLista: boolean = false; 
  dataInput: string;
  linkCalendar: string;
  tarefa1: string;
  tarefa2: string;

  eventoService: EventService;

  listarEventos(): void {
   this.mostrarLista = !this.mostrarLista;
  }
  
  associarEventosPorData( data: string, tarefa: string): void{
  
    for(let i=0;i<this.events.length;i++){
      if(this.events[i].data == data){

        // Faz a associação de cada evento à tarefa especificada
        this.events[i].tarefas.push(tarefa)
        
        this.mostrarLista = !this.mostrarLista;
        // 
      }
    }
  this.dataInput = "";
  this.tarefa1 = "";
  }

  associarEventosPorLink(link: string, tarefa: string): void{

    if( link == "google.calendar/evento1_dasdadasd"){
      // Faz a associação de cada evento à tarefa especificada
     
      this.calendarEvent.tarefas.push(tarefa)
     
      this.events.push(this.calendarEvent);
      
      this.mostrarLista = !this.mostrarLista;
      // 
    }
    else{}
  this.linkCalendar = "";
  this.tarefa2 = "";
  }


  ngOnInit(): void{
    this.eventoService.getEventos()
      .subscribe(
        as => { this.events = as; },
        msg => { alert(msg.message); }
      );
  } 
  
}