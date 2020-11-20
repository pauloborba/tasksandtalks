import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../../common/projeto';

@Component({
    selector: 'projetos',
    templateUrl: './projetos.component.html',
    styleUrls: ['./projetos.component.css']
  })
  
  export class ProjetosComponent implements OnInit {
    projetos: Projeto[] = []
    projeto: Projeto = new Projeto();
    nomeDuplicado: boolean = false;

    constructor() {

    }
    
    ngOnInit() {

    }
}