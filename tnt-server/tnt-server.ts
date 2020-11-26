import express = require('express');
import bodyParser = require("body-parser");

import {Event} from '../common/event';

var tntserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

var evento: Event[] = [{nome: "Preparar Aula de Requisitos", data:"15/12/2020", hora:"08:00", tarefas:["ESS"]},{nome:"Preparar Seminário" , data:"20/12/2020" , hora:"10:00" , tarefas:["CBSoft"]}];

tntserver.get('/eventos', function(req: express.Request,res: express.Response){
	res.send(JSON.stringify(evento));
})

tntserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
