import { Projeto } from '../common/projeto';

export class RepositorioDeProjetos {
    listaDeProjetos : Projeto[] = [];
    adicionarProjeto(projeto : Projeto) {
        var result = null;
        if (this.nomeNaoCadastrado(projeto.nome)) {
            result = new Projeto();
            result = projeto
            this.listaDeProjetos.push(projeto);
            this.atualizarAtributos(false, false);
        }
        return result;
    };

    nomeNaoCadastrado (nome: string) {
        return !this.listaDeProjetos.find(p => p.nome === nome)
    };

    getProjetos(): Projeto[] {
        return this.listaDeProjetos;
    };

    removerProjeto(nomeProjeto : string): Projeto {
        if (this.nomeNaoCadastrado(nomeProjeto)) return null
        var projeto = this.listaDeProjetos.find(p => p.nome == nomeProjeto)
        this.atualizarAtributos(projeto.arquivado, true)
        this.listaDeProjetos = this.listaDeProjetos.filter(p => p.nome != projeto.nome)
        return projeto
    };

    arquivarProjeto(projeto: Projeto): Projeto{
        var result = null
        this.listaDeProjetos.forEach(p => {
            if (p.nome === projeto.nome) {
                p.conclusao = projeto.conclusao
                p.arquivado = true
                result = p
                this.atualizarAtributos(true, false)
            }
        })

        return result
    };

    atualizarAtributos(arquivou: boolean, deletou: boolean): void{};
} 