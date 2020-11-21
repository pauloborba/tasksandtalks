import { Tarefa } from './tarefa';

export class Projeto {
    nome: string;
    criacao: Date;
    conclusao: Date;
    arquivado: boolean;
    tarefas: Tarefa[] = [];

    constructor(){
        this.clear();
    }

    clear(){
        this.nome = "";
        this.criacao = new Date();
        this.conclusao = new Date();
        this.arquivado = false;
        this.tarefas = [];
    }

    clone(): Projeto {
        var projeto: Projeto = new Projeto();
        projeto.nome = this.nome;
        projeto.criacao = this.criacao;
        projeto.conclusao = this.conclusao;
        projeto.arquivado = this.arquivado;
        projeto.tarefas = this.tarefas;
        return projeto;
    }
}