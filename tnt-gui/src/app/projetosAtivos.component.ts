import { Component, OnInit } from '@angular/core';
import {EstatisticasService} from './estatisticas.service';

@Component({
    selector: 'ProjetosAtivos',
    templateUrl: './projetosAtivos.component.html',
    styleUrls: ['./projetosAtivos.component.css']
  })
  export class ProjetosAtivosComponent implements OnInit {
    constructor(private estatisticasService: EstatisticasService) {}

    mensagemSobreAtivos: string;
    porcentagemAtivos: string;
    listaPorcQuant: number[];
    listaChavesQuant: (string[] | number[])[];

    inicializar(lst:number[]){
      this.listaPorcQuant = lst;
      if(this.listaPorcQuant[1] == 0){
        this.mensagemSobreAtivos = "Não há projetos ativos";
      }else{
        this.mensagemSobreAtivos = "Há " + this.listaPorcQuant[1].toString() + " projeto(s) ativo(s)"
      }
      if(this.listaPorcQuant[0]) this.porcentagemAtivos = this.listaPorcQuant[0].toString() + '%';
      else this.porcentagemAtivos = '';
    }

    ngOnInit() {
      this.estatisticasService.getAtivos()
      .subscribe(
          at => { this.listaChavesQuant = at },
          msg => { alert(msg.message); }
      );
      this.estatisticasService.getPorcentagem(true)
      .subscribe(
          lst => this.inicializar(lst),
          msg => { alert(msg.message); }
      );
    }
  }