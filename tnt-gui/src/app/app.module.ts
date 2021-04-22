import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread/thread.component';
import { ReplyComponent } from './reply/reply.component';
import { TarefaComponent } from './tarefa/tarefa.component';

import { ProjetosComponent } from './projetos/projetos.component';
import { ProjetoComponent } from './projetos/projeto/projeto.component';
import { ProjetoService } from './projetos/projeto.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent,
    ReplyComponent,
    ProjetosComponent,
    ProjetoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'thread',
        component: ThreadComponent
      },
      {
        path: 'projetos',
        component: ProjetosComponent
      },
      {
        path: 'projetos/:projetoID',
        component: ProjetoComponent
      },
      {
        path: 'projetos/:projetoID/:tarefaID',
        component: TarefaComponent
      }
    ])
  ],
  providers: [ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

