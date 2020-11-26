import request = require("request-promise");
import { closeServer } from '../tnt-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../tnt-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de chat", () => {
    return request.get(base_url + "chat")
            .then(body => 
               expect(body).not.toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });

  it("so aceita a mensagem do tipo chat", () => {
    var options:any = {method: 'POST', uri: (base_url + "chat"), body:{sender: "Marcelo", messageContent: "Ola", qualquercoisa: "2020-11-26T05:43:01.000Z"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "A mensagem não pode ser enviada"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("No momento inicial, não tem lembrete", () => {
    return request.get(base_url + "lembrete")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });

  it("tenta colocar um lembrete", () => {
    var options:any = {method: 'POST', uri: (base_url + "lembrete"), body:{sender: "Marcelo", messageContent: "Novo lembrete", sendDate: "2020-11-28T13:35:01.000Z"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({success: "O lembrete foi enviado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("vai listar os lembretes", () => {
    return request.get(base_url + "lembrete")
            .then(body => 
               expect(body).not.toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });

})