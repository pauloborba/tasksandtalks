import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextoComponent } from './contexto.component';
import { ContextoService } from './contexto.service';

@NgModule({
  declarations: [
    AppComponent,
    ContextoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'contexto',
        component: ContextoComponent
      }
    ])
  ],
  providers: [ContextoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
