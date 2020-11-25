import { Component, OnInit } from '@angular/core';
import { Email } from '../../../common/Email';

import {LembretedeConversasService} from './lembretedeconversas.service';

interface ThreadEmailI {
  id: number;
  email: Email;
  reply_id: number;
  datalembrete: string;
}

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit {
  constructor(private lembreteService : LembretedeConversasService ) { }
  datalembrete : string;
  i : number;
  superserverlist : (number[] | string[]);
  serverdatelist : (number[] | string []);
  idinlist : boolean;

  loggedUser = {
    name: 'Example',
    email: 'example1@cin.ufpe.br'
  }
  userMessage: string = 'Estou respondendo este email';

  emails: ThreadEmailI[] = []
  userEmail: Email = new Email(this.loggedUser.email, '', '', this.userMessage);

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      const email = new Email('example1@cin.ufpe.br', 'example2@cin.ufpe.br', `Teste ${i *200 + 3 + i}`, 'Testeando');
      const id = i;
      const reply_id = i - 1;
      var datalembrete = "";
      this.emails.push({
        id,
        email,
        reply_id,
        datalembrete
      })
    }
    this.lembreteService.getData()
    .subscribe(
      as => {
        this.superserverlist = as[0];
        this.serverdatelist = as[1];
        },
      msg => { alert(msg.message); }
     );
    
  }

  criarlembrete(novoemail : ThreadEmailI, novastring : string){

    var id :number = novoemail.id ;

    console.log("string de data:" + novastring);

    this.lembreteService.criarLembrete([id, novastring])
        .subscribe(
          ar => {
            if (ar) {
              alert("Lembrete de data do email de id "+ id.toString() +" salvo com sucesso");
            } else {
              alert("Não foi possivel salvar o lembrete do email de id "+ id.toString());
            } 
          },
          msg => { alert(msg.message); }
        );
  }

  getClass(novaemail : ThreadEmailI) : string{
    var id :number = novaemail.id;
    if(this.idinlistaux(id)){
      if(this.idistoday(id)){
        return "sender-recipient-container-vermelho"
      }
      return "sender-recipient-container-verde";
    }
    

    return "sender-recipient-container";
  }

  idinlistaux( id : number){
    for(let newid of this.superserverlist){
      if(id == newid){
        return true;
      }
    }
    return false;
  }

  idistoday( id : number) : boolean{
    var countids : number = 0
    var countdate : number = 0
    var datacompare : string = "";
    var datahoje = new Date();

    for(let newid of this.superserverlist){
      if(id == newid){

        for (let data of this.serverdatelist){

          for(let i=0;i<11;i++){
            datacompare = datacompare + data[i];
          }

          if(datahoje.getDate() == parseInt(datacompare.substr(0,2))){
            if((datahoje.getMonth()+1) == parseInt(datacompare.substr(3,2))){
              if(datahoje.getFullYear() == parseInt(datacompare.substr(6,4))){
                if(countdate == countids){
                  return true;
                }
              }
            }
          }

          datacompare = "";
          countdate++;
        }
      }
      countids++;
    }
    return false;
  }

//('1isisToday(threadEmail) ? 'email-container' : 
}
