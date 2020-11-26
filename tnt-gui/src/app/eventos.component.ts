import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Event } from '../../../common/event';
import { Tarefa } from '../../../common/tarefa';
import { TarefaService } from './tarefa.service';

@Component({
  selector: 'eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})



export class EventosComponent implements OnInit{
  event: Event = {nome: "", data: "", hora: "", tarefas: [""]};
  events: Event[] = [{nome: "Preparar Aula de Requisitos", data: "20/12/2020", hora: "08:00", tarefas: [""]}];
  calendarEvent: Event = {nome: "Monitoria  de InfraSoft", data: "16/12/2020", hora:"19:00", tarefas:[""]};
  tarefa: Tarefa = {descricao:"", prazo:"", concluida:false, arquivada:false, snoozing:false, contextos:[{lembrete:true, lido:true, atenção:true,evento: [{nome:"", data:"", hora:"", tarefas:[""]}]}] };
  mostrarLista: boolean = false; 
  dataInput: string;
  linkCalendar: string;
  tarefa1: string;
  tarefa2: string;

  constructor(private tarefaService: TarefaService){}
  

  listarEventos(): void {
   this.mostrarLista = !this.mostrarLista;
  }
  
  associarEventosPorData( data: string, tarefaS: string): void{
  
    this.tarefa = {descricao:"", prazo:"", concluida:false, arquivada:false, snoozing:false, contextos:[{lembrete:true, lido:true, atenção:true,evento: [{nome:"", data:"", hora:"", tarefas:[""]}]}] };
  
    for(let i=0;i<this.events.length;i++){
      if(this.events[i].data == data){

        this.tarefa.descricao = tarefaS;
        this.tarefa.contextos[0].evento[0] = this.events[i];

        // Faz a associação de cada evento à tarefa especificada
        this.events[i].tarefas.push(tarefaS)
        
        this.mostrarLista = !this.mostrarLista;
        
        this.tarefaService.atualizar(this.tarefa).subscribe(
          (a) => { if (a == null) alert("Unexpected fatal error"); },
          (msg) => { alert(msg.message); }
        );
        // 
      }
    }
  this.dataInput = "";
  this.tarefa1 = "";
  }

  associarEventosPorLink(link: string, tarefaS: string): void{

    this.tarefa = {descricao:"", prazo:"", concluida:false, arquivada:false, snoozing:false, contextos:[{lembrete:true, lido:true, atenção:true,evento: [{nome:"", data:"", hora:"", tarefas:[""]}]}] };

    if( link == "google.calendar/evento1_dasdadasd"){
      // Faz a associação de cada evento à tarefa especificada
      this.tarefa.descricao = tarefaS;
      this.tarefa.contextos[0].evento[0] = this.calendarEvent;

      this.calendarEvent.tarefas.push(tarefaS)
      this.events.push(this.calendarEvent);

      this.mostrarLista = !this.mostrarLista;

      this.tarefaService.atualizar(this.tarefa).subscribe(
        (a) => { if (a == null) alert("Unexpected fatal error"); },
        (msg) => { alert(msg.message); }
      );
      // 
    }
    else{}
  this.linkCalendar = "";
  this.tarefa2 = "";
  }


  ngOnInit(): void{

  } 
  
}