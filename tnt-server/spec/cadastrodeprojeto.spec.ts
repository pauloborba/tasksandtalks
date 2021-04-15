import { RepositorioDeProjetos } from '../RepositorioDeProjetos';
import { Projeto } from '../../common/projeto';

describe("O cadastro de projetos", () => {
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

  it("é inicialmente vazio", () => {
    expect(cadastro.getProjetos().length).toBe(0);
  })

  it("cadastra projetos corretamente", () => {
    cadastrarProjeto("Requisito");

    var projeto = expectSoUmProjeto();
    expect(projeto.nome).toBe("Requisito");
    expect(projeto.arquivado).toBe(false);
    expect(projeto.conclusao).toBe(null);
    expect(projeto.tarefas.length).toBe(0);
  })

  it("não aceita projetos com o mesmo nome", () => {
    cadastrarProjeto("Requisito");
    cadastrarProjeto("Requisito");

    var projeto = expectSoUmProjeto();
    expect(projeto.nome).toBe("Requisito");
  })
})
