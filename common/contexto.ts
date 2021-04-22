export class Contexto {
    lembrete: Date;
    lido: boolean;
    atenção: boolean;
    snoozing: boolean;

    constructor() {
        this.lembrete = null;
        this.lido = false;
        this.atenção = false;
        this.snoozing = false;
    }
}