import request = require("request-promise");
import { closeServer } from '../tnt-server';

var base_url = "http://localhost:3000/";
/*antes de iniciar estes testes eh preciso verificar no servidor se o construtor da classe
RepositorioDeProjetos esta com seu argumento booleano em false (eh necessario para
nao haver projetos ja instanciados na inicializacao do servidor)*/
describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../tnt-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna media de projetos criados por mes igual a null", () => {
    return request.get(base_url + "dadosGerais/mediaCriacao")
            .then(body => 
               expect(body).toBe('null')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("inicialmente retorna duracao media de projetos igual a null", () => {
    return request.get(base_url + "dadosGerais/duracaoMedia")
            .then(body => 
               expect(body).toBe('null')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("inicialmente retorna porcentagem e quantidade de projetos ativos como null e 0", () => {
    return request.get(base_url + "projetosEstat/porcentagem:true")
            .then(body => 
               expect(body).toBe('[null,0]')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("inicialmente retorna porcentagem e quantidade de projetos arquivados como null e 0", () => {
    return request.get(base_url + "projetosEstat/porcentagem:false")
            .then(body => 
               expect(body).toBe('[null,0]')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("so retorna porcentagem e quantidade de projetos se for passado um booleano como parametro", () => {
    return request.get(base_url + "projetosEstat/porcentagem:oi")
            .then(body => 
               expect(body).toBe('{"failure":"parametro invalido (nao eh booleano)"}')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("inicialmente retorna lista de projetos ativos e datas de criacao com listas vazias", () => {
    return request.get(base_url + "projetosEstat/ativos")
            .then(body => 
               expect(body).toBe('[[],[]]')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
  it("inicialmente retorna lista de projetos arquivados e datas de conclusao com listas vazias", () => {
    return request.get(base_url + "projetosEstat/arquivados")
            .then(body => 
               expect(body).toBe('[[],[]]')
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })
})