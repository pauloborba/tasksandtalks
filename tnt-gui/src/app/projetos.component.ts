import { Component, OnInit } from '@angular/core';

import { Projeto } from '../../../common/projeto';
import { ProjetoService } from './projetos.service'

@Component({
    selector: 'projetos',
    templateUrl: './projetos.component.html',
    styleUrls: ['./projetos.component.css']
  })
  
  export class ProjetosComponent implements OnInit {
    constructor(private projetoService: ProjetoService) {}

    projetos: Projeto[]
    projeto: Projeto = new Projeto();
    nomeDuplicado: boolean = false;
    

    criarProjeto(projeto: Projeto){
      this.projetoService.criar(projeto);
      this.projetos.push(projeto.clone());
    }
    
    ngOnInit() {
      this.projetos = this.projetoService.getProjetos();
    }
}