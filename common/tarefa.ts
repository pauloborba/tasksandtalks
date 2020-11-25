import { Contexto } from './contexto';

export class Tarefa {
  descricao: string;
  prazo: Date;
  concluida: boolean;
  arquivada: boolean;
  snoozing: boolean;
  lembrete: Date;
  contextos: Contexto[];

  constructor() { }

}
