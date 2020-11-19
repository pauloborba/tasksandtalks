import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread.component';
import { ReplyComponent } from './reply.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'thread',
        component: ThreadComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
