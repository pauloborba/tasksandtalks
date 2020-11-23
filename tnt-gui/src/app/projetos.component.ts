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
    projeto: Projeto = new Projeto(false);
    sobrecarga: string;
    nomeDuplicado: boolean = false;
    

    criarProjeto(projeto: Projeto){
      if(this.sobrecarga != ""){
        projeto.sobrecarga = parseInt(this.sobrecarga);
      }
      this.projetoService.criar(projeto);
      this.projeto = new Projeto(false);
      this.sobrecarga = "";
    }

    ordenar(ascending: boolean){
      this.projetoService.ordenar(ascending);
    }

    getClass(projeto: Projeto){
      var index = this.projetoService.getIndexFromSobrecarga(projeto.sobrecarga);

      if(index < 0){
        return 'button button1';
      }
      else if(index == 0){
        return 'button button2'
      }
      return 'button button3'
    }
    
    ngOnInit() {
      this.projetos = this.projetoService.getProjetos();
    }
}