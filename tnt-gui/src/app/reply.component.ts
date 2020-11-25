import { Injectable, Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Email } from '../../../common/Email';

interface ThreadEmailI {
  id: number;
  email: Email;
  reply_id: number;
}

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})

@Injectable()
export class ReplyComponent implements OnInit {
  @Input() ThreadEmail: ThreadEmailI;
  @Input() Email: Email;

  constructor(private http: Http) { }

  ngOnInit(): void { }

  replyThreadEmail(threadEmail, email: Email) {
    console.log(threadEmail, email)

    const reply_email = threadEmail.email;
    const recipient = reply_email.getSender();
    const subject = reply_email.getSubject();

    email.setRecipient(recipient);
    email.setSubject(`Re: ${subject}`);

    console.log(`Enviando email de ${email.getSender()} para ${recipient}...`)

    const reply_id = threadEmail.id;
    const id = threadEmail.id + 1;

    const base_url = 'http://localhost:3000';
    const url = `${base_url}/email/send`
    const data = JSON.stringify(email);
    const headers = { headers: new Headers({ 'Content-Type': 'application/json' }) };

    return this.http.post(url, data, headers).toPromise().then(res => {
      console.log(res)
      alert('Email enviado com sucesso.')
    }).catch(error => {
      console.log(error)
      alert('Falha no envio de Email.')
    });

  }

}
