import { Contexto } from '../contexto';

describe("O cadastro de alunos", () => {
  var contextolemb: Contexto;

  function criarLembrete(lista : [number,string] ) {

    contextolemb.criarNovoLembrete(lista);
  }

  function expectSoUmLembrete() {
    expect((contextolemb.getMap()[1]).length).toBe(1);
    expect((contextolemb.getMap()[0]).length).toBe(1);
    var aluno : (number[] | string[]) = contextolemb.getMap()[1];
    return aluno;
  }

  beforeEach(() => contextolemb = new Contexto())

  it("é inicialmente vazio", () => {
    var contexter: Contexto;
    contexter = new Contexto();
    expect((contexter.getMap()[0]).length).toBe(0);
  })

  it("cadastra datas corretamente", () => {
    criarLembrete([3, "20/03/2021"]);

    var datacompare : string = "";
    var aluno = expectSoUmLembrete();
    for(let data of aluno){
      for(let i=0;i<10;i++){
        datacompare = datacompare + data[i];
      }
    }
    expect(datacompare).toBe("20/03/2021");
  })
})