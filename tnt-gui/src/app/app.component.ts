import { Component, OnInit  } from '@angular/core';
import { LembretedeConversasService } from './lembretedeconversas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lista :  Map < number, string >;
  listadedatas : (number[] | string[]);
  listadedata : string[];
  listadeids : (number[] | string[]);

  constructor(private lembreteService : LembretedeConversasService ) {}
  title = 'tnt-gui';

  ngOnInit(): void { 
    this.lembreteService.getData()
    .subscribe(
      as => {
        this.primeiroAlerta(as);
        },
      msg => { alert(msg.message); }
     );
  }

  primeiroAlerta(at : (number[] | string[])[]) : void{

    this.listadedatas = at[1];

    var datahoje = new Date();
    var datacompare : string = "";
    
    for (let data of this.listadedatas){
      for(let i=0;i<11;i++){
        datacompare = datacompare + data[i];
      }
        if(datahoje.getDate() == parseInt(datacompare.substr(0,2))){
          if((datahoje.getMonth()+1) == parseInt(datacompare.substr(3,2))){
            if(datahoje.getFullYear() == parseInt(datacompare.substr(6,4))){
              alert("Olá, você tem lembrete(s) de conversas marcado(s) para hoje.");
            }
          }
        }
        datacompare = "";
        console.log("data: " + data);
    }
    
  }
  

}
