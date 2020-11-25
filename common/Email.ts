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

    setSender(sender){
        this.sender = sender;
    }

    setRecipient(recipient){
        this.recipient = recipient;
    }

    setSubject(subject: string){
        this.subject = subject;
    }

    setContent(content: string){
        this.content = content;
    }

    getSender(){
        return this.sender;
    }

    getRecipient(){
        return this.recipient;
    }

    getSubject(){
        return this.subject;
    }

    getContent(){
        return this.content;
    }
}