import { Component, OnInit } from '@angular/core';
import {EstatisticasService} from './estatisticas.service';

@Component({
    selector: 'ProjetosArquivados',
    templateUrl: './projetosArquivados.component.html',
    styleUrls: ['./projetosArquivados.component.css']
  })
  export class ProjetosArquivadosComponent implements OnInit {
    constructor(private estatisticasService: EstatisticasService) {}

    mensagemSobreArquivados: string;
    porcentagemArquivados: string;
    listaPorcQuant: number[];
    listaChavesQuant: (string[] | number[])[];
    listaMeses: (string[] | number[]);
    listaArquivadosPorMes: (string[] | number[]);
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
      this.listaArquivadosPorMes = at[1];

      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      this.barChartLabels = this.listaMeses;
      this.barChartType = 'line';
      this.barChartLegend = true;
      this.barChartData = [
        {data: this.listaArquivadosPorMes, label: 'Projetos Arquivados'}
      ];
    }

    inicializar(lst:number[]){
      this.listaPorcQuant = lst;
      if(this.listaPorcQuant[1] == 0){
        this.mensagemSobreArquivados = "Não há projetos arquivados";
      }else{
        this.mensagemSobreArquivados = "Há " + this.listaPorcQuant[1].toString() + " projeto(s) arquivado(s)"
      }
      if(this.listaPorcQuant[0]) this.porcentagemArquivados = this.listaPorcQuant[0].toString() + '%';
      else this.porcentagemArquivados = '';
    }

    ngOnInit() {
      this.estatisticasService.getArquivados()
      .subscribe(
          arq => this.inicializarGrafico(arq),
          msg => { alert(msg.message); }
      );
      this.estatisticasService.getPorcentagem(false)
      .subscribe(
          lst => this.inicializar(lst),
          msg => { alert(msg.message); }
      );
    }
  }