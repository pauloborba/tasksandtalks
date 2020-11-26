export class Chat{
    sender: string;
    messageContent: string;
    sendDate: Date;

    constructor() {
        this.clean();
    }

    clean(): void {
        this.sender = "";
        this.messageContent = "";
        this.sendDate = new Date();
      }

    copyFrom(from: Chat): void {
        this.sender = from.sender;
        this.messageContent = from.messageContent;
        this.sendDate = from.sendDate;
    }
}