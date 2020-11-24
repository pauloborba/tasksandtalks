import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstatisticasComponent } from './estatisticas.component';
import { DadosGeraisComponent } from './dadosGerais.component';
import { ProjetosAtivosComponent } from './projetosAtivos.component';
import { ProjetosArquivadosComponent } from './projetosArquivados.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
