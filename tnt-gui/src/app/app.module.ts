import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread.component';
import { ReplyComponent } from './reply.component';

import { ProjetosComponent } from './projetos.component';
import { ProjetoService } from './projeto.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent,
    ReplyComponent,
    ProjetosComponent
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
      }
    ])
  ],
  providers: [ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

