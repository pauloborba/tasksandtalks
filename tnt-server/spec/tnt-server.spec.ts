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
    var options:any = {method: 'POST', uri: (base_url + "chat"), body:{sender: "Lin", messageContent: "Bom dia", banana: "2020-11-26T05:43:01.000Z"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "A mensagem não pode ser enviada"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("inicialmente não tem snoozing", () => {
    return request.get(base_url + "snoozing")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  });
})