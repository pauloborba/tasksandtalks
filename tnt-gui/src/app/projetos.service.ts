import { Injectable } from '@angular/core';

import { Projeto } from '../../../common/projeto';

@Injectable()
export class ProjetoService {
    projetos: Projeto[] = [];

    criar(projeto: Projeto): Projeto {
        this.projetos.push(projeto.clone());
        return projeto;
    }

    getProjetos(): Projeto[] { 
        var projetos: Projeto[] = [];
        for(let p of this.projetos){
            projetos.push(p.clone());
        }
        return projetos;
     } 
}