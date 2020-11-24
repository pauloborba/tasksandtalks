import express = require('express');
import bodyParser = require("body-parser");

import {RepositorioDeProjetos} from './RepositorioDeProjetos';

var tntserver = express();
var repositorioDeProjetos = new RepositorioDeProjetos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

tntserver.get('/projetosEstat/ativos', function (req:express.Request, res:express.Response) {
    res.send(JSON.stringify(repositorioDeProjetos.getAtivos()));
})

tntserver.get('/projetosEstat/porcentagem:returnAtivos', function (req:express.Request, res:express.Response) {
    var returnAtivos = (req.params.returnAtivos.search('true') > 0);
    res.send(JSON.stringify(repositorioDeProjetos.getPorcentagem(returnAtivos)));
})

tntserver.get('/dadosGerais/duracaoMedia', function (req:express.Request, res:express.Response) {
    res.send(JSON.stringify(repositorioDeProjetos.getDuracaoMedia()));
})

tntserver.get('/dadosGerais/mediaCriacao', function (req:express.Request, res:express.Response) {
    res.send(JSON.stringify(repositorioDeProjetos.getMediaDeCriacao()));
})

var server = tntserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
  
function closeServer(): void {
    server.close();
}

export { tntserver, server, closeServer }