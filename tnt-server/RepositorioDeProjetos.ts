import { Projeto } from '../common/projeto';

export class RepositorioDeProjetos {
    projetosCriadosPorMes : Map<string, number>;
    projetosArquivadosPorMes : Map<string, number>;
    listaDeProjetos : Projeto[];
    adicionarProjeto(projeto : Projeto){};
    removerProjeto(nomeProjeto : string){};

    constructor(){
        this.projetosArquivadosPorMes = new Map();
        this.projetosCriadosPorMes = new Map();
        this.listaDeProjetos = [];
    }

    getDuracaoMedia() : any{
        var retorno = null;
        var concluidos = 0;
        var somaDias = 0;
        //itera sobre a lista de projetos
        for(let proj of this.listaDeProjetos){
            //considera somente projetos concluidos
            if(proj.arquivado){
                concluidos++;
                //duracao de um projeto concluido em milisegundos dividido pela quantidade de milisegundos de um dia
                var duracaoEmDias = (proj.conclusao.getTime() - proj.criacao.getTime())/1000*60*60*24;
                somaDias += duracaoEmDias;
            }
        }
        if(concluidos > 0) retorno = (somaDias/concluidos);
        return retorno;
    }

    getMediaDeCriacao() : any{
        var retorno = null;
        var somaProjsPorMes = 0;
        //iterar sobre o conjunto de projetos criados por mes
        for(let chave of this.projetosCriadosPorMes.keys()){
            somaProjsPorMes += this.projetosCriadosPorMes.get(chave);
        }
        if(this.projetosCriadosPorMes.size > 0){
            retorno = somaProjsPorMes/this.projetosCriadosPorMes.size;
        }
        return retorno;
    }

    atualizarAtributos(arquivou:boolean) : void{
        //confere se a atualizacao se refere a um projeto arquivado
        if(arquivou){
            this.atualizaMes(this.projetosArquivadosPorMes);
            this.preencherMesesZerados(this.projetosArquivadosPorMes);
        }
        //confere se a atualizacao se refere a um projeto criado
        else{
            this.atualizaMes(this.projetosCriadosPorMes);
            this.preencherMesesZerados(this.projetosCriadosPorMes);
        }
    }

    atualizaMes(mapProjetos:Map<string, number>) : void{
        //encontra a chave para o objeto map (mes + ano)
        var date = new Date();
        //chave dos maps => "ano(number)mes(number)"
        var mes = date.getMonth().toPrecision(2);
        var ano = date.getFullYear();
        var chave = ano.toString() + mes.toString();

        //se a chave ja existe (se ja existem projetos nesse mes)
        if(mapProjetos.has(chave)){
            var ultimoValor = mapProjetos.get(chave);   //valor a ser incrementado
            mapProjetos.set(chave, (ultimoValor+1));
        }
        //se a chave ainda nao existe (ainda nao foram arquivados/criados projetos nesse mes)
        else{
            mapProjetos.set(chave, 1);
        }
    }

    preencherMesesZerados(mapProjetos:Map<string,number>) : void{
        //encontrar data inicial (mais antiga)
        var listaData = this.getDataInicial(mapProjetos);
        var mesInicial = listaData[0], anoInicial = listaData[1], ultimoMes;

        var data = new Date();
        var anoRecente = data.getFullYear();
        var mesRecente = data.getMonth();
        
        if(anoInicial == anoRecente) ultimoMes = mesRecente;
        else ultimoMes = 12;

        /*
            * iterar sobre todos os anos e meses entre inicio e hoje
            * se alguma chave nao existir: adicionar item ao map (zerado)
        */
        for(let j = anoInicial; j <= anoRecente; j++){
            for(let i = mesInicial+1; i <= ultimoMes; i++){
                var mesStr, anoStr = j.toString();
                if(i < 10) mesStr = '0' + i.toString();
                else mesStr = i.toString();
                var chave = anoStr + mesStr;
                if(!mapProjetos.has(chave)){
                    mapProjetos.set(chave, 0);
                }
                //atualizando limitadores dos lacos
                if(i == ultimoMes && j == anoRecente-1){
                    ultimoMes = mesRecente;
                }
                if(j == anoInicial && i == ultimoMes){
                    mesInicial = 0;
                }
            }
        }
    }

    getDataInicial(objMap:Map<string, number>) : number[]{
        //encontrar data mais antiga em um conjunto de chaves
        var data = new Date();
        var ano = data.getFullYear();
        var mes = data.getMonth();
        var mesInicial = mes, anoInicial = ano;

        var chaves = objMap.keys();
        for(let chave of chaves){
            var listaData = this.getMesEAnoDeString(chave);
            if(listaData[0] <= anoInicial && listaData[1] <= mesInicial){
                anoInicial = listaData[0];
                mesInicial = listaData[1];
            }
        }
        return [mesInicial, anoInicial];
    }

    getMesEAnoDeString(chave:string) : number[]{
        var ano = parseInt(chave.substr(0, 4));
        var mes = parseInt(chave.substr(4, 2));
        return [ano, mes];
    }
} 