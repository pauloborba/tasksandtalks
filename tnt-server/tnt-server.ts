import express = require('express');
import bodyParser = require("body-parser");

import { Contexto } from './contexto';

var tntserver = express();

var contextolemb: Contexto = new Contexto();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

tntserver.post('/lembreteconversation', function (req: express.Request, res: express.Response) {
  var tmp : boolean;
  var newReminder : [number,string]  = <[number,string]> req.body;
  console.log("1 :" + newReminder[0]);
  console.log("2 :" + newReminder[1]);
  tmp = contextolemb.criarNovoLembrete(newReminder);
  if (tmp) {
    res.send({"success": "O lembrete foi salvo com sucesso"});
  } else {
    res.send({"failure": "O lembrete não pode ser salvo"});
  }
})

tntserver.get('/datas', function (req: express.Request, res: express.Response) {
  var novids = new Map();
  //novids = contextolemb.getMap();
  var listadedatas = novids.values();
  res.send(JSON.stringify(contextolemb.getMap()));
})

var server = tntserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function closeServer(): void {
    server.close();
}
 
export { server, closeServer }