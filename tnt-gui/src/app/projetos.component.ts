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
    count: number = 0;
    

    criarProjeto(projeto: Projeto){
      this.projetoService.criar(projeto);
    }

    getClass(){
      this.count++;
      if(this.count%3 == 0){
        return 'button button1';
      }
      else if(this.count % 3 == 1){
        return 'button button2'
      }
      return 'button button3'
    }
    
    ngOnInit() {
      this.projetos = this.projetoService.getProjetos();
    }
}