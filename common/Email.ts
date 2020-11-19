export class Email{
    sender: string;
    recipient: string;
    content: string;
    subject: string;

    constructor(sender: string, recipient: string, content: string, subject: string){
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.subject = subject;
    }

}