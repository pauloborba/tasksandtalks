import request = require("request-promise");
import { Email } from '../../common/Email'

var BASE_URL = 'http://localhost:3000';

interface RequestBodyI {
    sender?: string;
    recipient?: string;
    subject?: string;
    content?: string;
}

interface RequestI {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    uri: string;
    body: RequestBodyI;
    json: boolean;
    resolveWithFulLResponse: boolean;
}

describe("O servidor", () => {
    let server = require('../tnt-server')

    it("envia emails corretamente", async () => {
        const sender = 'jbmn2@cin.ufpe.br';
        const recipient = 'jbmn2@cin.ufpe.br';
        const subject = 'Testando...';
        const content = 'O corpo de mensagem';

        const data = { sender, recipient, subject, content }

        var options: RequestI = {
            method: 'POST',
            uri: `${BASE_URL}/email/send`,
            body: data,
            json: true,
            resolveWithFulLResponse: true
        };

        return request(options).then((response) => {
            expect(response).toEqual('OK')
        });
    });

    it("não envia emails incompletos", async () => {
        const sender = 'jbmn2@cin.ufpe.br';
        const subject = 'Testando...';
        const content = 'O corpo de mensagem';

        const data = { sender, subject, content }

        var options: RequestI = {
            method: 'POST',
            uri: `${BASE_URL}/email/send`,
            body: data,
            json: true,
            resolveWithFulLResponse: true
        };

        return request(options).then((response) => {
            const { message } = response;
            expect(message).toBe('missing information in body')
        });
    });

})
