import { RepositorioDeProjetos } from '../RepositorioDeProjetos';
import { Projeto } from '../../common/projeto';

describe("O arquivamento de projetos", () => {
  var cadastro: RepositorioDeProjetos;

  function cadastrarProjeto(nome:string) {
    var projeto: Projeto = new Projeto();
    projeto.nome = nome;
    cadastro.adicionarProjeto(projeto);
  }

  function expectSoUmProjeto() {
    expect(cadastro.getProjetos().length).toBe(1);
    var projeto = cadastro.getProjetos()[0];
    return projeto;
  }

  beforeEach(() => cadastro = new RepositorioDeProjetos())

  it("arquiva projetos corretamente", () => {
    cadastrarProjeto("Requisitos");

    var projeto = expectSoUmProjeto();
    cadastro.atualizarProjeto(projeto)
    expect(projeto.nome).toBe("Requisitos");
    expect(projeto.arquivado).toBe(true);
  })

})
