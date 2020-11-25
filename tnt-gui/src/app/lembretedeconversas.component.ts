import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { LembretedeConversasService } from './lembretedeconversas.service';

@Component({
    selector: 'lembretedeconversas',
    templateUrl: './lembretedeconversas.component.html',
    styleUrls: ['./lembretedeconversas.component.css']
  })

  export class LembretedeConversasComponent implements OnInit {
    /*  
    diadelembrete : string = "";
    mesdelembrete : string = "";
    anodelembrete : string = "";
    datacompleta : string = "";
    trueData : Date = new Date(this.datacompleta)
    Dataslembradas :string[] = [];
    tmp : boolean = false;
    todayDate = Date()

    constructor(private lembreteService : LembretedeConversasService ) {}

    chamaconsoli(){
      this.datacompleta = this.diadelembrete + '/' + this.mesdelembrete + '/' + this.anodelembrete;
      console.log("mudar algo");

      this.lembreteService.criarLembrete(this.datacompleta)
        .subscribe(
          ar => {
            if (ar) {
              alert("Lembrete de data "+this.datacompleta+" salvo com sucesso");
            } else {
              alert("Não foi possivel salvar o lembrete de data"+ this.datacompleta);
            } 
          },
          msg => { alert(msg.message); }
        );
    }

    
*/
    ngOnInit(): void {}

  }
