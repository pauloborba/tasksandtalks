import express = require('express');
import bodyParser = require("body-parser");

import { Email } from '../common/Email'
import { EmailSenderService } from './EmailSenderService'

const LISTEN_PORT = 3000;

var tntserver = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

tntserver.post('/email/send', async (request, response) => {
    const { sender, recipient, subject, content } = request.body;
    const bodyComplete = sender && recipient && subject && content;
    if (bodyComplete) {
        const email = new Email(sender, recipient, subject, content);
        const emailSender = new EmailSenderService();
        try {
            await emailSender.execute(email)
            response.sendStatus(200);
        }
        catch (error) {
            response.send({ message: `unexpected error occured: ${error}` }).sendStatus(500);
        }
    }
    else {
        response.send({ message: 'missing information in body' }).sendStatus(400);
    }

});

tntserver.listen(LISTEN_PORT, () => {
    console.log('🚀 Server is Running...')
});