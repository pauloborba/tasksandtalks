import { Tarefa } from './tarefa';

export class Projeto {
    nome: string;
    criacao: Date;
    conclusao: Date;
    arquivado: boolean;
    tarefas: Tarefa[] = [];
    sobrecarga: number = -1;

    constructor(cloning: boolean){
        this.clear(cloning);
    }

    clear(cloning: boolean){
        this.nome = "";
        this.criacao = new Date();
        this.conclusao = new Date();
        this.arquivado = false;
        this.tarefas = [];
        if(!cloning){
            this.sobrecarga = this.getSobrecarga(2, 1, 1);
        }
    }

    clone(): Projeto {
        var projeto: Projeto = new Projeto(true);
        projeto.nome = this.nome;
        projeto.criacao = this.criacao;
        projeto.conclusao = this.conclusao;
        projeto.arquivado = this.arquivado;
        projeto.tarefas = this.tarefas;
        projeto.sobrecarga = this.sobrecarga;
        return projeto;
    }

    getSobrecarga(pesoTasks: number, pesoChats: number, pesoMails: number): number {
        if(this.sobrecarga == -1){
            console.log("sobrecarga:");
            var tarefas = this.getQuantidadeTarefas();
            var emails = this.getEmailsNaoLidos();
            var chats = this.getChatsNaoLidos();
            console.log(tarefas, emails, chats);
            this.sobrecarga = (pesoTasks * tarefas + pesoChats * chats + pesoMails * emails) / (pesoMails + pesoTasks + pesoChats);
            console.log(this.sobrecarga);
        }
        return this.sobrecarga;
    }

    getQuantidadeTarefas(): number {
        return this.randomInt(0, 10);
    }

    getEmailsNaoLidos(): number {
        return this.randomInt(0, 50);
    }

    getChatsNaoLidos(): number {
        return this.randomInt(0, 50);
    }

    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}