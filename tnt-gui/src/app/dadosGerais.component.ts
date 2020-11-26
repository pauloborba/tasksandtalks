import { Component, OnInit } from '@angular/core';
import {EstatisticasService} from './estatisticas.service';

@Component({
    selector: 'DadosGerais',
    templateUrl: './dadosGerais.component.html',
    styleUrls: ['./dadosGerais.component.css']
})
export class DadosGeraisComponent implements OnInit {
    constructor(private estatisticasService: EstatisticasService) {}
    
    duracaoMedia;
    mediaDeProjetosCriados;

    ngOnInit(): void {
        this.estatisticasService.getDuracaoMedia()
            .subscribe(
                dm => { if(dm) this.duracaoMedia = dm; else this.duracaoMedia = 'Não há projetos concluídos'},
                msg => { alert(msg.message); }
            );
        this.estatisticasService.getMediaCriacao()
            .subscribe(
                mc => { if(mc) this.mediaDeProjetosCriados = mc; else this.mediaDeProjetosCriados = 'Não há projetos criados no histórico'},
                msg => { alert(msg.message); }
            );
    }
}