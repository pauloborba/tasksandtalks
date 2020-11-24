export class EmailSenderService {
    public sender: string;

    constructor(sender: string) {
        this.sender = sender;
    }

    public send(subject: string, recipient: string, content: string) { }
}