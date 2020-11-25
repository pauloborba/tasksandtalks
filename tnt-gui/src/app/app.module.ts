import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjetosComponent } from './projetos.component';
import { ProjetoService } from './projeto.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjetosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
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

