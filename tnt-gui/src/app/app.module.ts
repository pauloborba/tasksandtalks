import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstatisticasComponent } from './estatisticas.component';
import { DadosGeraisComponent } from './dadosGerais.component';
import { ProjetosAtivosComponent } from './projetosAtivos.component';
import { ProjetosArquivadosComponent } from './projetosArquivados.component';
import { EstatisticasService } from './estatisticas.service';

@NgModule({
  declarations: [
    AppComponent,
    EstatisticasComponent,
    DadosGeraisComponent,
    ProjetosAtivosComponent,
    ProjetosArquivadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: 'estatisticas',
        component: EstatisticasComponent
      },
      {
        path: 'dadosGerais',
        component: DadosGeraisComponent
      },
      {
        path: 'projetosAtivos',
        component: ProjetosAtivosComponent
      },
      {
        path: 'projetosArquivados',
        component: ProjetosArquivadosComponent
      }
    ])
  ],
  providers: [EstatisticasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
