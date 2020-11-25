import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread.component';
import { LembretedeConversasComponent } from './lembretedeconversas.component';
import { LembretedeConversasService } from './lembretedeconversas.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent,
    LembretedeConversasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'thread',
        component: ThreadComponent
      },
      {
        path: 'lembretedeconversas',
        component: LembretedeConversasComponent
      }
    ])
  ],
  providers: [LembretedeConversasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
