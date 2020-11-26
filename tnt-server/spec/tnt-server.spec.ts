import request = require("request-promise");
import { closeServer } from '../tnt-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../tnt-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de chats vazia", () => {
    return request.get(base_url + "chat")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só envia mensagens de chat", () => {
    var options:any = {method: 'POST', uri: (base_url + "chat"), body:[{helicoptero:"helicoptero"}], json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "O chat não foi enviado"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

}) 