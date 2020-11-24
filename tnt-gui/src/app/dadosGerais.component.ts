import { Component, OnInit } from '@angular/core';
import {EstatisticasService} from './estatisticas.service';

@Component({
    selector: 'DadosGerais',
    templateUrl: './dadosGerais.component.html',
    styleUrls: ['./dadosGerais.component.css']
})
export class DadosGeraisComponent implements OnInit {
    constructor(private estatisticasService: EstatisticasService) {}
    
    duracaoMedia:number;
    mediaDeProjetosCriados:number;

    ngOnInit(): void {
        this.estatisticasService.getDuracaoMedia()
            .subscribe(
                dm => { this.duracaoMedia = dm; },
                msg => { alert(msg.message); }
            );
        this.estatisticasService.getMediaCriacao()
            .subscribe(
                mc => { this.mediaDeProjetosCriados = mc; },
                msg => { alert(msg.message); }
            );
    }
}