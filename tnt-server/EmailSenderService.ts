export class EmailSenderService {
    public sender: string;

    constructor(sender: string) {
        this.sender = sender;
    }

    public send(recipient: string, subject: string, content: string) { }
}