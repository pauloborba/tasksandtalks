import { Event } from '../common/event';
import { Tarefa } from '../common/tarefa';

export class Servicos {
   tarefas: Tarefa[] = [{descricao: "ESS", prazo:"15/12/2020", concluida: false, arquivada: false, snoozing: true, contextos:[{lembrete: false, lido: false, atenção: true, evento:[{nome:"", data:"", hora:"", tarefas:[""]}]}]},{descricao: "CBSoft", prazo:"20/12/2020", concluida: false, arquivada: false, snoozing: true, contextos:[{lembrete: false, lido: false, atenção: true, evento:[{nome:"", data:"", hora:"", tarefas:[""]}]}]}];



    atualizar(tarefa: Tarefa): Tarefa {
     var result: Tarefa = this.tarefas.find(a => a.descricao == tarefa.descricao);
     if (result) {
        result.contextos[0].evento[0] = tarefa.contextos[0].evento[0];
   
     }
     return result;
   }


   getTarefas(): Tarefa[]{
       return this.tarefas;
   }

}