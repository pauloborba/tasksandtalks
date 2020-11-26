import express = require('express');
import bodyParser = require("body-parser");

import {Tarefa} from '../common/tarefa';
import {Servicos} from './servicos';

var tntserver = express();

var servicos: Servicos = new Servicos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

var tarefa: Tarefa[] = [{descricao: "ESS", prazo:"15/12/2020", concluida: false, arquivada: false, snoozing: true, contextos:[{lembrete: false, lido: false, atenção: true, evento:[{nome:"ALGO", data:"", hora:"", tarefas:[""]}]}]},{descricao: "CBSoft", prazo:"20/12/2020", concluida: false, arquivada: false, snoozing: true, contextos:[{lembrete: false, lido: false, atenção: true, evento:[{nome:"ALGO", data:"", hora:"", tarefas:[""]}]}]}];


tntserver.get('/tarefas', function(req: express.Request,res: express.Response){
	res.send(JSON.stringify(servicos.getTarefas()));
})

tntserver.put('/tarefas', function (req: express.Request, res: express.Response) {
  var tarefa: Tarefa = <Tarefa> req.body;
  tarefa = servicos.atualizar(tarefa);
  if (tarefa) {
    res.send({"success": "A tarefa foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A tarefa não pode ser atualizada"});
  }
})



tntserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
