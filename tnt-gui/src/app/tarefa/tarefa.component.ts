import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tarefa } from '../../../../common/tarefa';
import { Contexto } from '../../../../common/contexto';

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
  public ordenacao: boolean = false;

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
    this.tarefaService.atualizarMensagens(this.projetoID, this.tarefaID)
      .subscribe(
        res => {
          if (res) {
            this.getTarefa();
          } else {
            alert('Tarefa não atualizada');
          }
        },
        msg => { alert(msg.message); }
      );
  }

  novaOrdem(): void {
    if (this.ordenacao) {
      this.tarefa.contextos.sort((x) => {
        return x.atencao ? 1 : -1;
      })
    } else {
      this.tarefa.contextos.sort((x) => {
        return x.atencao ? -1 : 1;
      })
    }

    this.ordenacao = !this.ordenacao;
  }

  mudarStatus(contexto: Contexto, status: string): void {
    this.tarefaService.atualizarTarefa(this.projetoID, this.tarefaID, status, contexto.mensagem)
      .subscribe(
        res => {
          if (res) {
            this.getTarefa();
          } else {
            alert('Tarefa não atualizada');
          }
        },
        msg => { alert(msg.message); }
      );
  }

  getTarefa(): void {
    this.tarefaService.getTarefa(this.projetoID, this.tarefaID)
      .subscribe(
        t => {
          this.tarefa = t;
        },
        msg => { alert(msg.message); }
      );
  }

}
