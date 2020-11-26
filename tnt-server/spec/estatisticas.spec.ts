import { RepositorioDeProjetos } from '../RepositorioDeProjetos'
import { Projeto } from '../../common/projeto'

function getDataHoje():string{
    var date:Date = new Date();
    //gerar string de data no formato 'ddmmyyyy'
    var dia = date.getDate().toString();
    if(parseInt(dia) < 10) dia = '0' + dia;
    var mes = (date.getMonth()+1).toString();
    if(parseInt(mes) < 10) mes = '0' + mes;
    var ano = date.getFullYear().toString();
    var dataHojeString = dia+mes+ano;
    return dataHojeString;
}

describe("O repositorio de projetos ", () => {
    var repositorio: RepositorioDeProjetos;
  
    beforeEach(() => repositorio = new RepositorioDeProjetos(false))
  
    it("tem a lista de projetos inicialmente vazia", () => {
        expect(repositorio.listaDeProjetos.length).toBe(0);
    })

    it("armazena a quantidade de projetos criados por mes corretamente", () => {
        //data de hoje (para representar a data da criacao do projeto)
        var dataHojeString = getDataHoje();
        //adicao de projeto
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 1 de ESS"), dataHojeString);
        //comparacoes
        expect(repositorio.listaDeProjetos.length).toBe(1); //quantidade de projetos no repositorio
        expect(repositorio.projetosCriadosPorMes.size).toBe(1); //quantidade de meses existentes (desde o primeiro projeto criado)
        expect(repositorio.projetosCriadosPorMes.get(dataHojeString.substr(4,4)+dataHojeString.substr(2,2))).toBe(1);  //quantidade de projetos criados no mes atual
        //adicao de mais um projeto no mesmo mes
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 2 de ESS"), dataHojeString);
        expect(repositorio.listaDeProjetos.length).toBe(2); //quantidade de projetos no repositorio
        expect(repositorio.projetosCriadosPorMes.size).toBe(1); //quantidade de meses existentes (desde o primeiro projeto criado)
    })

    it("arquiva a quantidade de projetos criados por mes corretamente", () => {
        //data de hoje (para representar a data do arquivamento do projeto)
        var dataHojeString = getDataHoje();
        //adicao de projeto em um mes passado
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 1 de ESS"), "15012020");
        //tamanho da lista de projetos antes do arquivamento (nao deve ser alterada)
        var tamListaProj = repositorio.listaDeProjetos.length;
        //arquivamento de projeto na data atual
        repositorio.arquivarProjeto("roteiro 1 de ESS", dataHojeString);
        //comparacoes
        expect(repositorio.listaDeProjetos.length).toBe(tamListaProj); //quantidade de projetos no repositorio
        expect(repositorio.projetosArquivadosPorMes.size).toBe(1); //quantidade de meses existentes (desde o primeiro arquivamento)
        expect(repositorio.projetosArquivadosPorMes.get(dataHojeString.substr(4,4)+dataHojeString.substr(2,2))).toBe(1);  //quantidade de projetos arquivados no mes atual
    })

    it("calcula a media de projetos criados por mes corretamente", () => {
        //data de hoje (para representar a data da criacao do projeto)
        var dataHojeString = getDataHoje();
        //adicao de projeto
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 1 de ESS"), dataHojeString);
        //comparacoes
        expect(repositorio.getMediaDeCriacao()).toBe(1);    //media de projetos criados por mes (desde a criacao do primeiro projeto)
    })

    it("calcula a duracao media de projetos concluidos corretamente", () => {
        //data de hoje (para representar a data de criacao e de arquivamento do projeto)
        var dataHojeString = getDataHoje();
        
        //situacao com media igual a 0
        //adicao de projetos
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 1 de ESS"), dataHojeString);
        //arquivamento de projetos
        repositorio.arquivarProjeto("roteiro 1 de ESS", dataHojeString);
        //comparacoes
        expect(repositorio.getDuracaoMedia()).toBe(0);    //duracao media de projetos concluidos (como o unico projeto foi criado e concluido no mesmo dia: media=0)
        
        //situacao com media maior que 0 e com mais de um projeto concluido
        //adicao de projetos
        repositorio.adicionarProjeto(new Projeto(false, "roteiro 2 de ESS"), "23012020");
        //arquivamento de projetos
        repositorio.arquivarProjeto("roteiro 2 de ESS", "23022020");
        //comparacao
        expect(repositorio.getDuracaoMedia()).toBe(15); //(duracao1 (0) + duracao2 (30)) / 2
    })

    it("calcula a porcentagem de projetos ativos e arquivados corretamente", () => {
        //sem nenhum projeto ativo ou arquivado
        //comparacoes
        expect(repositorio.getPorcentagem(true)[0]).toBe(null);    //porcentagem de projetos ativos
        expect(repositorio.getPorcentagem(true)[1]).toBe(0);    //quantidade de projetos ativos
        expect(repositorio.getPorcentagem(false)[0]).toBe(null);    //porcentagem de projetos arquivados
        expect(repositorio.getPorcentagem(false)[1]).toBe(0);    //quantidade de projetos arquivados
        /*
        * nova instancia do repositorio (local) para testar o 
        * construtor stub (instancia 10 projetos: 6 ativos e 4 arquivados)
        */
        var repositorio2 = new RepositorioDeProjetos(true);
        //comparacoes
        expect(repositorio2.getPorcentagem(true)[0]).toBe(60);    //porcentagem de projetos ativos
        expect(repositorio2.getPorcentagem(true)[1]).toBe(6);    //quantidade de projetos ativos
        expect(repositorio2.getPorcentagem(false)[0]).toBe(40);    //porcentagem de projetos arquivados
        expect(repositorio2.getPorcentagem(false)[1]).toBe(4);    //quantidade de projetos arquivados
    })

    it("retorna corretamente a quantidade atual de projetos ativos e arquivados", () => {
        /*
        * nova instancia do repositorio (local) para testar o 
        * construtor stub (instancia 10 projetos: 6 ativos e 4 arquivados)
        */
        var repositorio2 = new RepositorioDeProjetos(true);
        //comparacoes
        var arrMeses = repositorio2.getAtivos()[0];
        var arrayQuantProjs = repositorio2.getAtivos()[1];
        var ultimoPontoY = arrayQuantProjs[arrayQuantProjs.length-1];
        expect(ultimoPontoY).toBe(6);    //quantidade recente de projetos ativos
        var arrMeses = repositorio2.getArquivados()[0];
        var arrayQuantProjs = repositorio2.getArquivados()[1];
        var ultimoPontoY = arrayQuantProjs[arrayQuantProjs.length-1];
        expect(ultimoPontoY).toBe(4);    //quantidade recente de projetos ativos
    })
})