import { Projeto } from '../common/projeto';

export class RepositorioDeProjetos {
    ativosDeletadosPorMes : Map<string, number>;
    arquivadosDeletadosPorMes : Map<string, number>;
    projetosCriadosPorMes : Map<string, number>;
    projetosArquivadosPorMes : Map<string, number>;
    listaDeProjetos : Projeto[];
    adicionarProjeto(projeto : Projeto){};
    removerProjeto(nomeProjeto : string){};

    constructor(){
        this.projetosArquivadosPorMes = new Map();
        this.projetosCriadosPorMes = new Map();
        this.ativosDeletadosPorMes = new Map();
        this.arquivadosDeletadosPorMes = new Map();
        this.listaDeProjetos = [];
    }

    getPorcentagem(returnAtivos:boolean) : number[]{
        var ativos = 0, arquivados = 0;
        for(let proj of this.listaDeProjetos){
            if(proj.arquivado) arquivados++;
            else ativos++;
        }
        var porcAtivos = null, porcArquivados = null;
        if(this.listaDeProjetos.length > 0){
            porcAtivos = ativos*100/this.listaDeProjetos.length;
            porcArquivados = arquivados*100/this.listaDeProjetos.length;
        }
        if(returnAtivos) return [porcAtivos, ativos];
        else return [porcArquivados, arquivados];
    }

    getArquivados() : (string[] | number[])[]{
        var retorno = null;
        //atualiza map de projetos arquivados por mes (caso nao tenha os meses mais recentes)
        this.preencherMesesZerados(this.projetosArquivadosPorMes);
        //vetor com chaves ordenadas cronologicamente
        var chavesStr : string[] = Array.from(this.projetosArquivadosPorMes.keys());
        this.ordenaChavesCronologicamente(chavesStr);
        var arquivPorMes : Map<string,number> = new Map();
        //preencher map com arquivados por mes
        var arquiv = 0;
        for(let chave of chavesStr){
            var deletados = 0, arquivados = 0;
            if(this.projetosArquivadosPorMes.has(chave)){
                arquivados = this.projetosArquivadosPorMes.get(chave);
            }
            if(this.arquivadosDeletadosPorMes.has(chave)){
                deletados = this.arquivadosDeletadosPorMes.get(chave);
            }
            arquiv = arquiv + arquivados - deletados;
            console.log(arquivados);
            arquivPorMes.set(chave, arquiv);
        }
        var listaChavesQuant = [(Array.from(arquivPorMes.keys())), (Array.from(arquivPorMes.values()))];
        return listaChavesQuant;
    }

    getAtivos() : (string[] | number[])[]{
        var retorno = null;
        //atualiza map de projetos criados por mes (caso nao tenha os meses mais recentes)
        this.preencherMesesZerados(this.projetosCriadosPorMes);
        //vetor com chaves ordenadas cronologicamente
        var chavesStr : string[] = Array.from(this.projetosCriadosPorMes.keys());
        this.ordenaChavesCronologicamente(chavesStr);
        var ativosPorMes : Map<string,number> = new Map();
        //preencher map com ativos por mes
        var ativos = 0;
        for(let chave of chavesStr){
            var criados = 0, deletados = 0, arquivados = 0;
            if(this.projetosCriadosPorMes.has(chave)){
                criados = this.projetosCriadosPorMes.get(chave);
            }
            if(this.projetosArquivadosPorMes.has(chave)){
                arquivados = this.projetosArquivadosPorMes.get(chave);
            }
            if(this.ativosDeletadosPorMes.has(chave)){
                deletados = this.ativosDeletadosPorMes.get(chave);
            }
            ativos = ativos + criados - arquivados - deletados;
            ativosPorMes.set(chave, ativos);
        }
        var listaChavesQuant = [(Array.from(ativosPorMes.keys())), (Array.from(ativosPorMes.values()))];
        return listaChavesQuant;
    }

    ordenaChavesCronologicamente(chavesStr:string[]){
        chavesStr.forEach(parseInt);
        chavesStr.sort();
        chavesStr.forEach(toString);
    }

    getDuracaoMedia() : number{
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

    getMediaDeCriacao() : number{
        var retorno = null;
        var somaProjsPorMes = 0;
        //atualiza map de projetos criados por mes (caso nao tenha os meses mais recentes)
        this.preencherMesesZerados(this.projetosCriadosPorMes);
        //iterar sobre o conjunto de projetos criados por mes
        for(let chave of this.projetosCriadosPorMes.keys()){
            somaProjsPorMes += this.projetosCriadosPorMes.get(chave);
        }
        if(this.projetosCriadosPorMes.size > 0){
            retorno = somaProjsPorMes/this.projetosCriadosPorMes.size;
        }
        return retorno;
    }

    atualizarAtributos(arquivou:boolean, deletou:boolean) : void{
        //confere se a atualizacao se refere a um projeto arquivado
        if(arquivou){
            if(deletou){
                this.atualizaMes(this.arquivadosDeletadosPorMes);
            }else{
                this.atualizaMes(this.projetosArquivadosPorMes);
                this.preencherMesesZerados(this.projetosArquivadosPorMes);
            }
        }
        //confere se a atualizacao se refere a um projeto criado
        else{
            if(deletou){
                this.atualizaMes(this.ativosDeletadosPorMes);
            }else{
                this.atualizaMes(this.projetosCriadosPorMes);
                this.preencherMesesZerados(this.projetosCriadosPorMes);
            }
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