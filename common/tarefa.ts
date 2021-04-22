import { Contexto } from './contexto';

export class Tarefa {
  descricao: string;
  prazo: Date;
  concluida: boolean;
  arquivada: boolean;
  snoozing: boolean;
  lembrete: Date;
  contextos: Contexto[];

  constructor() { 
    this.descricao = "";
    this.prazo = null;
    this.concluida = false;
    this.arquivada = false;
    this.snoozing = false;
    this.lembrete = null;
    this.contextos = [];
  }

}
