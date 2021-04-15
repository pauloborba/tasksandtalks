import { Component, OnInit } from '@angular/core';
import { Email } from '../../../common/Email'

interface ThreadEmailI {
  id: number;
  email: Email;
  reply_id: number;
}

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit {
  constructor() { }

  loggedUser = {
    name: 'José Bezerra',
    email: 'jbmn2@cin.ufpe.br'
  }
  userMessage: string = 'Estou respondendo este email';

  emails: ThreadEmailI[] = []
  userEmail: Email = new Email(this.loggedUser.email, '', '', this.userMessage);

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      const email = new Email('jbmn2@cin.ufpe.br', 'phmb@cin.ufpe.br', `Teste ${i + 1}`, 'Apenas um Teste');
      const id = i;
      const reply_id = i - 1;
      this.emails.push({
        id,
        email,
        reply_id
      })
    }
  }
}
