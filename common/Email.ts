export class Email{
    sender: string;
    recipient: string;
    content: string;
    subject: string;

    constructor(sender: string, recipient: string, subject: string, content: string){
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.content = content;
    }
}