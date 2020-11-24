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



export class EventosComponent{
  event: Event = {nome: "", data: "", hora: "", tarefa: ""};
  events: Event[] = [{nome: "Preparar Aula de Requisitos", data: "15/12/2020", hora: "08:00", tarefa: "Aulas - ESS"},{nome: "Preparar seminario da CBsoft", data: "20/12/2020", hora: "12:00", tarefa: "CBsoft"}];
  mostrarLista: boolean = false; 
  dataInput: string;
  linkCalendar: string;
  tarefa1: string;
  tarefa2: string;


  listarEventos(): void {
   this.mostrarLista = !this.mostrarLista;
  }
  
  associarEventosPorData(data: string): void{
  
    for(let i=0;i<this.events.length;i++){
      if(this.events[i].data == data){
        // Faz a associação de cada evento à tarefa especificada
        this.mostrarLista = !this.mostrarLista;
        // 
      }
    }
  this.dataInput = "";
  this.tarefa1 = "";
  }

  associarEventosPorLink(link: string): void{

    if( link == "google.calendar/evento1_dasdadasd"){
      // Faz a associação de cada evento à tarefa especificada
      this.mostrarLista = !this.mostrarLista;
      // 
    }
    else{}
  this.linkCalendar = "";
  this.tarefa2 = "";
  }



}