import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { Tarefa } from '../../../common/tarefa';
import { TarefaService } from './tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tarefa: Tarefa = new Tarefa;
  tarefas: Tarefa[] = [];


  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.tarefaService.getTarefas()
    .subscribe(
      as => { this.tarefas = as; },
      msg => { alert(msg.message); }
    );

  }

}
