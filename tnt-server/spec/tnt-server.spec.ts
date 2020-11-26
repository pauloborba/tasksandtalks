import request = require("request-promise");
import { closeServer } from '../tnt-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../tnt-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de datas e ids vazia", () => {
    return request.get(base_url + "datas")
            .then(body => {
               expect(body).toBe('[[],[]]')
              })
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra datas validas", () => {
    var id:number = 3;
    var data:string  = "20/05/2019";
    var options:any = {method: 'POST', uri: (base_url + "lembreteconversation"), body: [id, data], json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "O lembrete não pode ser salvo"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

})