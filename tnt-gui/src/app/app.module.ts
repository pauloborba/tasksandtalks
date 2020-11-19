import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadComponent } from './thread.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent
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
