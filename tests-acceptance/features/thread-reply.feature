Feature: Reply
        As a Engenheiro de Software que necessita gerir seu tempo.
        I want to responder os emails presentes nas threads de emails.
        So that eu possa gerir e comunicar os afazeres com minha equipe.

Scenario: Respondendo email com sucesso
    Given Eu estou na seção "Thread de Emails"
    Given Eu posso ver um email com o assunto "Teste 1"
    When Eu respondo o email com o assunto "Teste 1"
    Then eu vejo um alerta "Email enviado com sucesso."
    Then Eu continuo na seção "Thread de Emails"
    Then Eu continuo vendo o email com o assunto "Teste 1"

Scenario: Respondendo email sem sucesso
    Given Eu estou na seção "Thread de Emails"
    Given Eu posso ver um email com o assunto "Teste 1"
    When Eu respondo o email com o assunto "Teste 1"
    Then eu vejo um alerta "Falha no envio de Email."
    Then Eu continuo na seção "Thread de Emails"
    Then Eu continuo vendo o email com o assunto "Teste 1"