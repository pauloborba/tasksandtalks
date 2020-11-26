import express = require('express');
import bodyParser = require("body-parser");
import { Projeto } from '../common/projeto';
import { RepositorioDeProjetos } from './RepositorioDeProjetos';

var repositorioDeProjetos: RepositorioDeProjetos = new RepositorioDeProjetos();

const LISTEN_PORT = 3000;
var tntserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

tntserver.get('/projetos', function (req: express.Request, res: express.Response) {
    res.send(JSON.stringify(repositorioDeProjetos.getProjetos()));
})

tntserver.post('/projeto', function (req: express.Request, res: express.Response) {
    var projeto: Projeto = <Projeto> req.body;
    projeto = repositorioDeProjetos.adicionarProjeto(projeto);
    if (projeto) {
      res.send({"success": "O projeto foi cadastrado com sucesso"});
    } else {
      res.send({"failure": "O projeto não pode ser cadastrado"});
    }
})


tntserver.put('/projeto', function (req: express.Request, res: express.Response) {
    var projeto: Projeto = <Projeto> req.body;
    projeto = repositorioDeProjetos.arquivarProjeto(projeto);
    if (projeto) {
      res.send({"success": "O projeto foi arquivado com sucesso"});
    } else {
      res.send({"failure": "O projeto não pode ser arquivado"});
    }
})

tntserver.delete('/projetos/:nome', function (req: express.Request, res: express.Response) {
    var nome: string = req.params.nome;
    var projeto: Projeto = repositorioDeProjetos.removerProjeto(nome);
  
    if (projeto) {
        res.send({"success": "O projeto foi deletado com sucesso"});
    } else {
        res.send({"failure": "O projeto não pode ser deletado"});
    }
})

var server = tntserver.listen(LISTEN_PORT, ()=>{
  console.log('🚀 Server is Running...')
});

function closeServer(): void {
  server.close();
}


export { server, closeServer }
