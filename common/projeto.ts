import { Tarefa } from './tarefa';

export class Projeto {
    constructor(arquivado:boolean, nome:string){
        this.arquivado = arquivado;
        this.nome = nome;
    }

    nome: string;
    criacao: Date;
    conclusao: Date;
    arquivado: boolean;
    tarefas: Tarefa[] = [];
}