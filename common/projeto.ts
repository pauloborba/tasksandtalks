import { Tarefa } from './tarefa';

export class Projeto {
    nome: string;
    criacao: Date;
    conclusao: Date;
    arquivado: boolean;
    tarefas: Tarefa[];

    constructor () {
        this.nome = "";
        this.criacao = new Date();
        this.conclusao = null;
        this.arquivado = false;
        this.tarefas = []; 
    }
}