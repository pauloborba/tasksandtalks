import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lembrete',
    templateUrl: './lembrete.component.html',
    styleUrls: ['./lembrete.component.css']
  })

  export class LembreteComponent implements OnInit {
      constructor() {}

      ngOnInit() {
          
      }
      openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
      closeForm() {
        document.getElementById("myForm").style.display = "none";
      }
  }