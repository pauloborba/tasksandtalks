import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos.component';
import { EventService } from './event.service';
import { ProjetosComponent } from './projetos.component';
import { TarefaComponent } from './tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    ProjetosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'projetos',
        component: ProjetosComponent
      },
      {
        path: 'projetos/tarefas',
        component: TarefaComponent
      },
      {
        path: 'projetos/tarefas/contexto',
        component: TarefaComponent
      }
    ])
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }