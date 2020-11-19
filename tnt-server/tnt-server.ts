import express = require('express');
import bodyParser = require("body-parser");

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

tntserver.listen(LISTEN_PORT, ()=>{
    console.log('🚀 Server is Running...')
});