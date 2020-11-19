import { Component, OnInit } from '@angular/core';
import { Email } from '../../../common/Email'

@Component({
  selector: 'app-contexto',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  constructor() { }

  emails: Email[] = []

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.emails.push(new Email('José Bezerra <jbmn2@cin.ufpe.br>', 'phmb@cin.ufpe.br', `Teste ${i + 1}`, 'Apenas um Teste'))
    }
  }
}
