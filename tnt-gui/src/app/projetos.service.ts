import { Projeto } from '../../../common/projeto';

export class ProjetoService {
    projetos: Projeto[] = [];
    media: number;
    quartil3: number;
    jaOrdenou: boolean = false;
    ordemAscendente: boolean;

    constructor(){
        this.projetos = [];
        this.jaOrdenou = false;
    }

    criar(projeto: Projeto): Projeto {
        if(!projeto.arquivado){
            this.projetos.push(projeto.clone());
            if(this.jaOrdenou){
                this.ordenar(this.ordemAscendente);
            }
        }
        this.atualizarEstatisticas();
        return projeto;
    }

    getIndexFromSobrecarga(sobrecarga: number): number{
        if(sobrecarga <= this.media){
            return -1;
        }else if(sobrecarga > this.media && sobrecarga < this.quartil3){
            return 0;
        }
        return 1;
    }

    ordenar(ascending: boolean){
        this.jaOrdenou = true;
        this.ordemAscendente = ascending;
        if(ascending){
            this.projetos.sort((a, b) => a.sobrecarga - b.sobrecarga);
        }else{
            this.projetos.sort((a, b) => (-1) * (a.sobrecarga - b.sobrecarga));
        }
    }

    atualizarEstatisticas(): void {
        this.media = this.getMedia();
        this.quartil3 = this.get75thPercentile();
    }

    getMedia(): number {
        var sum = this.projetos.reduce((a, b) => a + b.sobrecarga, 0);
        var avg = (sum / this.projetos.length) || 0;
        console.log('média: %f', avg);
        return avg;
    }

    get75thPercentile(): number {
        var list: Projeto[] = [];
        for(let p of this.projetos){
            list.push(p.clone());
        }
        list.sort((a, b) => a.sobrecarga - b.sobrecarga);
        var index = Math.floor(0.75 * (list.length));
        console.log('index: %i', index);
        return list[index].sobrecarga;
    }

    getProjetos(): Projeto[] { 
        return this.projetos;
     } 
}