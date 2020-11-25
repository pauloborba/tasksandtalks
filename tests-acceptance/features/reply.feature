Feature: Reply
        As a Engenheiro de Software que necessita gerir seu tempo.
        I want to responder os emails presentes nas threads de emails.
        So that eu possa gerir e comunicar os afazeres com minha equipe.

Scenario: Respondendo email com sucesso
    Given Eu estou na seção "Thread de Emails"
    Given Eu posso ver um email com o assunto "Teste 1"
    When Eu respondo esse email
    Then Eu continuo na seção "Email Thread"
    Then Eu continuo vendo o email com o assunto "Teste 1"
    Then eu vejo um alerta "Email enviado com sucesso."

Scenario: Respondendo email sem sucesso
    Given Eu estou na seção "Thread de Emails"
    Given Eu posso ver um email com o assunto "Teste 1"
    When Eu respondo esse email
    Then Eu continuo na seção "Email Thread"
    Then Eu continuo vendo o email com o assunto "Teste 1"
    Then eu vejo um alerta "Falha no envio de Email."