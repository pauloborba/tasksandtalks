import { Injectable } from '@angular/core';

import { Projeto } from '../../../common/projeto';

@Injectable()
export class ProjetoService {
    projetos: Projeto[] = [];
    media: number;
    quartil3: number;

    criar(projeto: Projeto): Projeto {
        this.projetos.push(projeto.clone());
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