import { Component, OnInit, Input } from '@angular/core';
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

export class ReplyComponent implements OnInit {
  @Input() ThreadEmail: ThreadEmailI;

  constructor() { }

  ngOnInit(): void { }

  replyThreadEmail(threadEmail) {
    console.log(threadEmail)
  }

}
