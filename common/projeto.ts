import { Tarefa } from './tarefa';

export class Projeto {
    nome: string;
    criacao: Date;
    conclusao: Date;
    arquivado: boolean;
    tarefas: Tarefa[] = [];
    sobrecarga: number = -1;
    qtdTarefas: number = 0;
    emailsNaoLidos: number = 0;
    chatsNaoLidos: number = 0;

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
            this.qtdTarefas = this.getQuantidadeTarefas();
            this.emailsNaoLidos = this.getEmailsNaoLidos();
            this.chatsNaoLidos = this.getChatsNaoLidos();
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
            var tarefas = this.qtdTarefas;
            var emails = this.emailsNaoLidos;
            var chats = this.chatsNaoLidos;
            console.log(tarefas, emails, chats);
            this.sobrecarga = (pesoTasks * tarefas + pesoChats * chats + pesoMails * emails) / (pesoMails + pesoTasks + pesoChats);
            console.log(this.sobrecarga);
        }
        return this.sobrecarga;
    }

    setQuantidadeTarefas(t: number){
        console.log(t);
        this.qtdTarefas = t;
    }

    getQuantidadeTarefas(): number {
        return this.randomInt(0, 10);
    }

    setEmailsNaoLidos(e: number){
        this.emailsNaoLidos = e;
    }

    getEmailsNaoLidos(): number {
        return this.randomInt(0, 50);
    }

    setChatsNaoLidos(c: number){
        console.log(c);
        this.chatsNaoLidos = c;
    }

    getChatsNaoLidos(): number {
        return this.randomInt(0, 50);
    }

    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}