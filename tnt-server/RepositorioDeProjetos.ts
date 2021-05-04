import { Projeto } from '../common/projeto';
import { Tarefa } from '../common/tarefa';

export class RepositorioDeProjetos {
    listaDeProjetos: Projeto[] = [];

    contextos: Tarefa["contextos"] = [
        {
            mensagem: 'Bugfix encontrado',
            lembrete: new Date(),
            lido: false,
            atencao: false,
            snoozing: false,
            resolvido: false
        },
        {
            mensagem: 'Revise o PR #33 no github',
            lembrete: new Date(),
            lido: true,
            atencao: true,
            snoozing: false,
            resolvido: false
        }
    ];

    adicionarProjeto(projeto: Projeto) {
        var result = null;
        if (this.nomeNaoCadastrado(projeto.nome)) {
            result = new Projeto();
            result = projeto
            this.listaDeProjetos.push(projeto);
            this.atualizarAtributos(false, false);
        }
        return result;
    };

    nomeNaoCadastrado(nome: string) {
        return !this.listaDeProjetos.find(p => p.nome === nome)
    };

    getProjetos(): Projeto[] {
        return this.listaDeProjetos;
    };

    removerProjeto(nomeProjeto: string): Projeto {
        if (this.nomeNaoCadastrado(nomeProjeto)) return null
        var projeto = this.listaDeProjetos.find(p => p.nome == nomeProjeto)
        this.atualizarAtributos(projeto.arquivado, true)
        this.listaDeProjetos = this.listaDeProjetos.filter(p => p.nome != projeto.nome)
        return projeto
    };

    atualizarProjeto(projeto: Projeto): Projeto {
        var result = null
        this.listaDeProjetos.forEach(p => {
            if (p.nome === projeto.nome) {
                p.conclusao = projeto.conclusao
                p.arquivado = projeto.arquivado
                p.tarefas = projeto.tarefas
                result = p
            }
        })

        return result
    };

    atualizarAtributos(arquivou: boolean, deletou: boolean): void { };

    // Tarefas
    getTarefa(projeto: string, tarefa: string): Tarefa {
        let result = null;
        let p = this.listaDeProjetos.find(p => p.nome === projeto);
        p.tarefas.forEach(t => {
            if (t.descricao === tarefa) {
                result = t;
            }
        });
        return result;
    }

    atualizarMensagens(projeto: string, tarefa: string): Tarefa {
        let result = null;
        let p = this.listaDeProjetos.find(p => p.nome === projeto);
        p.tarefas.forEach(t => {
            if (t.descricao === tarefa) {
                t.contextos = this.contextos;
                t.atualizacao = `${new Date(Date.now()).toISOString().substr(0, 10).split('-').reverse().join('/')} - ${new Date(Date.now()).toLocaleTimeString('en-US')}`;
                result = t;
            }
        });
        return result;
    }

    atualizarTarefa(projeto: string, tarefa: string, status: string,  mensagem: string): Tarefa { 
        let result = null;
        let p = this.listaDeProjetos.find(p => p.nome === projeto);
        p.tarefas.forEach(t => {
            if (t.descricao === tarefa) {
                if (status === 'atencao') {
                    t.contextos.forEach(c => {
                        if (c.mensagem === mensagem){
                            c.atencao = !c.atencao;
                        }
                    });
                } else {
                    t.contextos.forEach(c => {
                        if (c.mensagem === mensagem) {
                            c.resolvido = !c.resolvido;
                        }
                    });
                }
            }
            result = t;
        });
        return result;
    }
}