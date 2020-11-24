import express = require('express');
import bodyParser = require("body-parser");

var projetosJson = require('./projetos.json');

var tntserver = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
tntserver.use(allowCrossDomain);

tntserver.use(bodyParser.json());

var server = tntserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })



tntserver.get("/", (req, res) => {
    res.send(projetosJson);
})