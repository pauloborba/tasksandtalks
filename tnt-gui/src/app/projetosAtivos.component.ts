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
    listaMeses: (string[] | number[]);
    listaAtivosPorMes: (string[] | number[]);
    //atributos do grafico
    barChartOptions;
    barChartType;
    barChartLegend;
    barChartData;
    barChartLabels;

    ajustaDatas(datas){
      for(let i=0; i<datas.length; i++){
        datas[i] = datas[i].substr(4,2) + '/' + datas[i].substr(0,4);
      }
    }

    inicializarGrafico(at:(string[] | number[])[]){
      this.listaMeses = at[0];
      this.ajustaDatas(this.listaMeses);
      this.listaAtivosPorMes = at[1];

      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      this.barChartLabels = this.listaMeses;
      this.barChartType = 'line';
      this.barChartLegend = true;
      this.barChartData = [
        {data: this.listaAtivosPorMes, label: 'Projetos Ativos'}
      ];
    }

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
          at => this.inicializarGrafico(at),
          msg => { alert(msg.message); }
      );
      this.estatisticasService.getPorcentagem(true)
      .subscribe(
          lst => this.inicializar(lst),
          msg => { alert(msg.message); }
      );
    }
  }