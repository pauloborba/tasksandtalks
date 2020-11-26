import { RepositorioDeProjetos } from '../RepositorioDeProjetos';
import { Projeto } from '../../common/projeto';

describe("A remoção de projetos", () => {
    var cadastro: RepositorioDeProjetos;

    function cadastrarProjeto(nome:string) {
        var projeto: Projeto = new Projeto();
        projeto.nome = nome;
        cadastro.adicionarProjeto(projeto);
    }

    function expectSoUmProjeto() {
        expect(cadastro.getProjetos().length).toBe(1);
        var aluno = cadastro.getProjetos()[0];
        return aluno;
    }

  beforeEach(() => cadastro = new RepositorioDeProjetos())

  it("deleta projetos corretamente", () => {
    cadastrarProjeto("Requisito");

    var projeto = expectSoUmProjeto();
    cadastro.removerProjeto(projeto.nome)
    expect(cadastro.getProjetos().length).toBe(0);
  })
})
