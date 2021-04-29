import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tarefa } from '../../../../common/tarefa';

import { TarefaService } from './tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  public projetoID: string;
  public tarefaID: string;
  public tarefa: Tarefa;

  constructor(
    private tarefaService: TarefaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projetoID = this.route.snapshot.paramMap.get('projetoID');
    this.tarefaID = this.route.snapshot.paramMap.get('tarefaID');

    this.tarefaService.getTarefa(this.projetoID, this.tarefaID)
      .subscribe(
        t => {
          this.tarefa = t;
        },
        msg => { alert(msg.message); }
      );
  }

  atualizarMensagens(): void {
    this.projetoID = this.route.snapshot.paramMap.get('projetoID');
    this.tarefaID = this.route.snapshot.paramMap.get('tarefaID');

    this.tarefaService.atualizarMensagens(this.projetoID, this.tarefaID)
      .subscribe(
        t => {
            if (t) {
              console.log(this.tarefa)
              this.tarefa.contextos = t.contextos;
              console.log(t)
            } else {
                alert('Tarefa não adicionada');
            }
        },
        msg => { alert(msg.message); }
      );
  }

}
