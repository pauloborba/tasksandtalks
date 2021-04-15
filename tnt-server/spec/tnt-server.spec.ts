import request = require("request-promise");
import { closeServer } from '../tnt-server';
import { Projeto } from '../../common/projeto';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  function criarProjeto(nome:string) {
    var projeto: Projeto = new Projeto();
    projeto.nome = nome;
    return JSON.stringify(projeto);
  }

  beforeAll(() => {server = require('../tnt-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de projetos vazia", () => {
    return request.get(base_url + "projetos").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("não cadastra projetos com nome duplicado", () => {
    return request.post(base_url + "projeto", {"json":{"nome": "Requisito", "arquivado" : "false", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
         expect(body).toEqual({success: "O projeto foi cadastrado com sucesso"});
         return request.post(base_url + "projeto", {"json":{"nome": "Requisito", "arquivado" : "true", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
             expect(body).toEqual({failure: "O projeto não pode ser cadastrado"});
             return request.get(base_url + "projetos").then(body => {
                 expect(body).toContain('{"nome":"Requisito","arquivado":"false","conclusao":"null","tarefas":"[]","criacao":""}');
                 expect(body).not.toContain('{"nome":"Requisito","arquivado":"true","conclusao":"null","tarefas":"[]","criacao":""}');
             });
         });
     });
  });

  it("só deleta projetos que existem", () => {
    return request.post(base_url + "projeto", {"json":{"nome": "Teste", "arquivado" : "false", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
      expect(body).toEqual({success: "O projeto foi cadastrado com sucesso"});
      return request.delete(base_url + "projetos/Teste").then(body => {
          expect(JSON.parse(body)).toEqual({success: "O projeto foi deletado com sucesso"});
          return request.delete(base_url + "projetos/999").then(body => {
            expect(JSON.parse(body)).toEqual({failure: "O projeto não pode ser deletado"});
        });
      });
    });
  });

  it("só arquiva projetos que existem", () => {
    return request.post(base_url + "projeto", {"json":{"nome": "Teste2", "arquivado" : "false", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
      expect(body).toEqual({success: "O projeto foi cadastrado com sucesso"});
      return request.put(base_url + "projeto", {"json":{"nome": "Teste2", "arquivado" : "false", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
          expect(body).toEqual({success: "O projeto foi arquivado com sucesso"});
          return request.put(base_url + "projeto", {"json":{"nome": "000", "arquivado" : "false", "conclusao":"null", "tarefas":"[]", "criacao":""}}).then(body => {
            expect(body).toEqual({failure: "O projeto não pode ser arquivado"});
        });
      });
    });
  });
})
