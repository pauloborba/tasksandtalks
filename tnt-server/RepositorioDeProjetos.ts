import { Projeto } from '../common/projeto';

export class RepositorioDeProjetos {
    listaDeProjetos : Projeto[] = [];
    adicionarProjeto(projeto : Projeto) {
        var result = null;
        if (this.nomeNaoCadastrado(projeto.nome)) {
            result = new Projeto();
            result = projeto
            this.listaDeProjetos.push(projeto);
        }
        return result;
    };

    nomeNaoCadastrado (nome: string) {
        return !this.listaDeProjetos.find(p => p.nome === nome)
    };

    getProjetos(): Projeto[] {
        return this.listaDeProjetos;
    };

    removerProjeto(nomeProjeto : string){};
    atualizarAtributos(){};
} 