import express = require('express');
import bodyParser = require("body-parser");

import {ChatThread} from '../common/chatThread';
import request = require('request');
import { Chat } from '../common/chat';

var tntserver = express();

var chatThread: ChatThread = new ChatThread(); 

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

tntserver.get('/chat', function (req, res){ //req.params.id para acessar id do chatThread
    res.send(JSON.stringify(chatThread.getThreadChats()));
})

tntserver.post('/chat', function (req, res) {
    var chat: Chat = req.body;
    chatThread.addChat(chat);
    if (chat) {
        res.send({"success": "O chat foi enviado com sucesso"});
      } else {
        res.send({"failure": "O chat não foi enviado"});
      }
})

tntserver.get('/lembrete', function (req, res) {
    res.send(JSON.stringify(chatThread.getReminders()))
})

tntserver.post('/lembrete', function (req, res) {
    var chat: Chat = req.body
    res.send(chat)
    chatThread.addReminder(chat);
    if (chat) {
        res.send({"success": "O chat foi enviado com sucesso"});
      } else {
        res.send({"failure": "O chat não foi enviado"});
      }
})

tntserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
