import { Component, OnInit } from '@angular/core';
import { Contexto } from '../../../common/contexto';
import { ThreadComponent } from './thread.component';


var threadprincipal: ThreadComponent = new ThreadComponent();

@Component({
    selector: 'app-contexto',
    templateUrl: './contexto.component.html',
    styleUrls: ['./contexto.component.css']
  })
  export class ContextoComponent implements OnInit {
    constructor() {

    }
   
    ngOnInit() {

    }
  }
